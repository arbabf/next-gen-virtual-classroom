import mediasoup from 'mediasoup-client';
import {v4} from 'uuid';

let bntSub;
let bntCam;
let bntScreen;
let btnPause;
let chatMsg;
let sendChatBtn;
let chatDisp;
let textPublish;
let textWebcam;
let textScreen;
let textSubscribe;
let localVideo;
let remoteVideo;
let remoteStream;
let device;
let producer;
let producer2;
let producerPaused = false;
let consumeTransport;
let consumerTemp;
let userId;
let isWebcam;
let produceCallback, produceErrback;
let consumerCallback, ConsumerErrback;
const websocketURL = 'ws://localhost:8002/ws';

//let producers = new Array();
let producers = {};
let pId2cId = {};
let streams = {};
let callbacks = {};
let transportCallbacks = {};

let roomId;
let clientId;
let producerId_global;

let socket;

/*document.addEventListener("DOMContentLoaded", function() {
    bntCam = document.getElementById('btn_webcam');
    bntScreen = document.getElementById('btn_screen');
    bntSub = document.getElementById('btn_subscribe');
    bntMute = document.getElementById('btn_mute');
    textWebcam = document.getElementById('webcam_status');
    textScreen = document.getElementById('screen_status');
    textSubscribe = document.getElementById('subscribe_status');
    textMute = document.getElementById('mute_status');
    localVideo = document.getElementById('localVideo');
    remoteVideo = document.getElementById('remoteVideo');
    //chat button input and display
    sendChatBtn =  document.getElementById('send_chat');
    chatMsg = document.getElementById('messageBox');
    chatDisp = document.getElementById('messages');

    //button event listeners
    bntCam.addEventListener('click', publish);
    bntScreen.addEventListener('click', publish);
    bntSub.addEventListener('click', getAllProducers);
    // bntMute.addEventListener('click', test);

    
    bntCreateRoom = document.getElementById("btn_createRoom")
    bntJoinRoom = document.getElementById("btn_joinRoom")
    btnLeaveRoom = document.getElementById("btn_leaveRoom")
    bntSubmit = document.getElementById("btn_submit")
    chatContent = document.getElementById("chatContent")

    //button event listeners
    bntCreateRoom.addEventListener('click', createRoom);
    bntJoinRoom.addEventListener('click', joinRoom);
    bntSubmit.addEventListener("click", submitMessage)
    btnLeaveRoom.addEventListener("click", leaveRoom)
});*/

const connect = () => {
    //return; // WebSocket is kinda dodgy here. First, compile client code. Then, remove this line.
    socket = new WebSocket(websocketURL);
    /*socket.onopen = () => {
        // start our socket request.
        const msg = {
            type: "getRouterRtpCapabilities",
            data: {
                roomId: document.getElementById("roomId").value,
            }
        }
        const resp = JSON.stringify(msg);
        socket.send(resp);
    }*/

    socket.onmessage = (event) => {
        const jsonValidation = IsJsonString(event.data);
        if (!jsonValidation){
            console.error("json error");
            return;
        }

        let resp = JSON.parse(event.data);
        console.log(resp)
        switch (resp.type) {
            case 'getRouterRtpCapabilities':
                onRouterCapbabilities(resp);
                break;
            case 'createTransport':
                if (resp.data.isProducer) {
                    onProducerTransportCreated(resp);
                } else {
                    onConsumerTransportCreated(resp, socket);
                }
                break;
            case 'connectTransport':
                onSubConnected(resp);
                break;
            case "resumed":
                console.log(resp);
                break;
            case "consume":
                onSubscribed(resp);
                break;
            case "produce":
                producerId_global = resp.data.producerId;
                callbacks[resp.data.kind]({id: resp.data.producerId});
                break;
            case "createRoom":
                onRoomCreated(resp);
                break
            case "joinRoom":
                console.log("Joined\n"+resp.status.statusDesc);
                break
            case "chat":
                onChat(resp);
                break;
            case "getAllProducers":
                document.getElementById("remoteVideoSection").innerHTML = "";
                //producers = new Array();
                //resp.data.producers.forEach((val) => producers.push(val));
                producers = resp.data.producers;
                pId2cId = {};
                for (let cId in producers) {
                    pId2cId[producers[cId]["video"]] = cId;
                    pId2cId[producers[cId]["audio"]] = cId;
                }
                subscribe();
            default:
                break;
        }
    }
    console.log("Connected!");
}

//connect();

const onSubConnected = (resp) => {
    console.log('sub connected ?')
    transportCallbacks[resp.data.transportId]()
}

const onProducerTransportCreated = async (event) => {
    if (event.error){
        console.error('producer transport create error: ', event.error);
        return;
    }

    const transport = device.createSendTransport(event.data.params);
    
    transport.on('connect', async ({dtlsParameters}, callback, errback) => {
        const message = {
            type: 'connectTransport',
            data: {
                roomId,
                isProducer: true,
                transportId: transport.id,
                dtlsParameters
            }
        }

        const resp = JSON.stringify(message);
        socket.send(resp);
        transportCallbacks[transport.id] = callback;
        //callback();
    });
    
    //start transport on producer
    transport.on('produce', async ({kind, rtpParameters}, callback, errback) => {
        const message = {
            type: 'produce',
            data: {
                roomId,
                clientId,
                transportId: transport.id,
                kind,
                rtpParameters
            }
        };
        const resp = JSON.stringify(message);

        callbacks[kind]=callback

        socket.send(resp);
    });
    // end transport producer
    // connection state change begin
    transport.on('connectionstatechange', (state) => {
        switch (state) {
            case 'connecting':
                textPublish.innerHTML = 'publishing.....';
                console.log('publishing...')
                break;
            case 'connected':
                localVideo.srcObject = stream;
                console.log('published')
                textPublish.innerHTML = 'published';
                break;
            case 'failed':
                transport.close();
                textPublish.innerHTML = 'failed';
            default:
                break;
        }
    })
    // connection state change end

    let stream;
    try {
        stream = await getUserMedias(transport, isWebcam);
        const track = stream.getVideoTracks()[0];
        const track2 = stream.getAudioTracks()[0];
        console.log("DEBUG track: " + track.kind)
        console.log("DEBUG track2: " + track2.kind)
        const params = { track };
        const params2 = { track: track2 };

        producer = await transport.produce(params);
        producer2 = await transport.produce(params2);
    } catch (error) {
        console.error(error);
        textPublish.innerHTML = 'failed!';
    }
}

const onRouterCapbabilities = (resp) => {
    loadDevice(resp.data.rtpCapabilities);
    bntCam.disabled = false;
    bntScreen.disabled = false;
    bntSub.disabled = false;
}

const onConsumerTransportCreated = async (event, socket) => {
    if (event.error){
        console.error('consumer transport create error: ', event.error);
        return;
    }

    const transport = device.createRecvTransport(event.data.params);
    subTransportListen(transport);
}

const subTransportListen = async (transport) => {
    consumeTransport = transport;
    transport.on('connect', async ({dtlsParameters}, callback, errback) => {
        const message = {
            type: 'connectTransport',
            data: {
                transportId: transport.id,
                dtlsParameters,
                roomId
            }
        }
        console.log('pog');
        const resp = JSON.stringify(message);
        socket.send(resp);
        transportCallbacks[transport.id] = callback;
        //callback()
    });

    transport.on('connectionstatechange', async (state) => {
        switch (state) {
            case 'connecting':
                textSubscribe.innerHTML = 'subscribing...';
                break;
            case 'connected':
                //remoteVideo.srcObject = remoteStream;
                /*const msg = {
                    type: "resume",
                    data: {
                        roomId,
                        id: consumerIds.get(transport.id),
                        isProducer: false
                    }
                }
                const resp = JSON.stringify(msg);
                socket.send(resp);*/
                console.log('subscribed');
                textSubscribe.innerHTML = 'subscribed';
                break;
            case 'failed':
                console.log("failed")
                transport.close();
                textSubscribe.innerHTML = 'Failed';
                break;
            default:
                console.log("others")
                break;
        }
    });
    
    consume(transport.id);
}

const consume = async (tId) => {
    const { rtpCapabilities } = device;
    //for (const pId of producers) {
    for (let cId in producers) {
        if (cId == clientId) {
            continue
        }
        console.log("DEBUG: " + producers[cId]["video"]);
        console.log("DEBUG ------------------------")
        console.log("DEBUG: " + producers[cId]["audio"]);
        const video = { 
            type: 'consume', 
            data: {
                roomId,
                clientId,
                producerId: producers[cId]["video"],
                transportId: tId,
                rtpCapabilities
            }
        };

        const audio = { 
            type: 'consume', 
            data: {
                roomId,
                clientId,
                producerId: producers[cId]["audio"],
                transportId: tId,
                rtpCapabilities
            }
        };

        const vidResp = JSON.stringify(video);
        socket.send(vidResp);

        const audResp = JSON.stringify(audio);
        socket.send(audResp);
    }
}

const getAllProducers = async () => {
    const data = {
        type: 'getAllProducers',
        data: {
            roomId
        }
    }

    const resp = JSON.stringify(data);
    socket.send(resp);
}

const subscribe = async () => {
    const data = {
        type: 'createTransport',
        data: {
            clientId,
            forceTcp: false,
            isProducer: false,
            roomId
        }
    }

    const resp = JSON.stringify(data);
    socket.send(resp);
}

const onSubscribed = async (resp) => {
    const {
        producerId,
        transportId,
        id,
        kind,
        rtpParameters,
    } = resp.data;

    console.log(`pId: ${producerId}`)

    let codecOptions = {};
    const consumer = await consumeTransport.consume({
        id,
        producerId,
        kind,
        rtpParameters,
        codecOptions,
    });

    //remoteStream = stream;
    //streams.set(transportId, stream)
    if(kind == "video"){
        const stream = new MediaStream();
        stream.addTrack(consumer.track);
        streams[pId2cId[producerId]] = stream;
        console.log('epicness')

        videoSect = document.getElementById("remoteVideoSection")
        videoDiv = document.createElement("div")
        videoDiv.className = "my-1 px-1 w-full overflow-hidden sm:my-px sm:px-px md:my-px md:px-px lg:my-1 lg:px-1 lg:w-1/2 xl:my-1 xl:px-1"
        video = document.createElement("video")
        video.className = "w-full"
        video.setAttribute('controls', '')
        video.setAttribute('autoplay', '')
        video.setAttribute('playsinline', '')
        video.srcObject = stream
        videoDiv.appendChild(video)
        remoteName = document.createTextNode(pId2cId[producerId] + ":")
        videoSect.appendChild(remoteName)
        videoSect.appendChild(videoDiv)
    }
    else {
        streams[pId2cId[producerId]].addTrack(consumer.track);
    }
}

const publish = (e) => {
    isWebcam = (e.target.id == 'btn_webcam');
    textPublish = isWebcam ? textWebcam : textScreen;
    bntScreen.disabled = false;
    bntCam.disabled = false;

    const message = {
        type: 'createTransport',
        data: {
            clientId,
            forceTcp: false,
            rtpCapabilities: device.rtpCapabilities,
            isProducer: true,
            roomId
        }
    }

    const resp = JSON.stringify(message);
    socket.send(resp);
}

//==============
//
// Room
//
//==============

function createRoom() {
    socket.send(JSON.stringify({
        type: "createRoom"
    }))
}

function onRoomCreated(resp) {
    const { roomId } = resp.data
    //document.getElementById("roomId").value = roomId;
}

function joinRoom() {
    socket.send(JSON.stringify({
        type: "joinRoom",
        data: {
            roomId: document.getElementById("roomId").value, 
            clientId: document.getElementById("clientId").value
        }
    }))

    roomId = document.getElementById("roomId").value;
    clientId = document.getElementById("clientId").value;

    const msg = {
        type: "getRouterRtpCapabilities",
        data: {
            roomId: document.getElementById("roomId").value,
        }
    }
    const resp = JSON.stringify(msg);
    socket.send(resp);
}

function submitMessage() {
    socket.send(JSON.stringify({
        type: "chat",
        data: {
            roomId: document.getElementById("roomId").value, 
            clientId: document.getElementById("clientId").value,
            message: document.getElementById("chatMsg").value
        }
    }))

    divChat = document.getElementById("div_chat")
    divChat.appendChild(document.createTextNode(`${document.getElementById("clientId").value}: ${document.getElementById("chatMsg").value}`))
    divChat.appendChild(document.createElement("br"))
    
    document.getElementById("chatMsg").value = ""
}

function onChat(resp) {
    divChat = document.getElementById("div_chat")

    const {from, message} = resp.data
    divChat.appendChild(document.createTextNode(`${from}: ${message}`))
    divChat.appendChild(document.createElement("br"))
}

function leaveRoom() {
    socket.send(JSON.stringify({
        type: "leaveRoom",
        data: {
            roomId: document.getElementById("roomId").value, 
            clientId: document.getElementById("clientId").value
        }
    }))

    document.getElementById("roomId").value = ""
}

//==============
//
// misc
//
//==============

const IsJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (error) {
        return false;
    }
    return true;
}

const loadDevice = async (routerRtpCapabilities) => {
    try {
        device = new mediasoup.Device();
    } catch (error) {
        if (error.name == 'UnsupportedError') {
            console.log('browser not supported!');
        }
    }

    await device.load({routerRtpCapabilities});
}
let stream;
const getUserMedias = async (transport, isWebcam) => {
    if (!device.canProduce('video')) {
        console.error('cannot produce video');
        return;
    }
    // let stream;
    try {
        // stream = isWebcam ?
        // await navigator.mediaDevices.getUserMedia({video: true, audio: true}) :
        // await navigator.mediaDevices.getDisplayMedia({video: true});
        if (isWebcam){
            stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
            console.log("audio and video share");
        }else{
            // stream = await navigator.mediaDevices.getDisplayMedia({video: true, audio: true});
            stream = await getScreenShareWithMicrophone();
            console.log('got', stream.getTracks());
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
    return stream;
}

async function getScreenShareWithMicrophone(){
    const stream = await navigator.mediaDevices.getDisplayMedia({video: true, audio: true});
    const audio = await navigator.mediaDevices.getUserMedia({audio: true});
    return new MediaStream([audio.getTracks()[0], stream.getTracks()[0] ]);
}

// We'll be needing these, probably.
// Remove as required.
export { connect, onSubConnected, onProducerTransportCreated, onRouterCapbabilities, onConsumerTransportCreated, subTransportListen, createRoom, joinRoom, submitMessage,
        leaveRoom, consume, getAllProducers, subscribe, onSubscribed, publish, IsJsonString, loadDevice, getUserMedias, getScreenShareWithMicrophone }
