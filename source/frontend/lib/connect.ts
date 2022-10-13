import * as mediasoup from 'mediasoup-client';
import { RtpCapabilities } from 'mediasoup-client/lib/RtpParameters';
import { Transport } from 'mediasoup-client/lib/Transport';

let remoteStream: any;
let device: mediasoup.Device;
let producer;
let producer2;
let transport: Transport;
let consumeTransport: Transport;
let isWebcam: boolean;
const websocketURL = 'ws://localhost:8002/ws';

let producers: any = {};
let pId2cId: any = {};
let streams: any = {};
// List of callbacks, because we can't guarantee the server has actually processed the information until we get a response back.
// We call whichever callback we need using the response's ID.
let callbacks: any = {};
let transportCallbacks: any = {};

let currRoomId: number;
let clientId: string;
let producerId_global: string;

let socket: WebSocket;

const connect = () => {
    socket = new WebSocket(websocketURL);

    socket.onmessage = (event) => {
        const jsonValidation = IsJsonString(event.data);
        if (!jsonValidation) {
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
                    onConsumerTransportCreated(resp);
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
                callbacks[resp.data.kind]({ id: producerId_global });
                break;
            case "createRoom":
                onRoomCreated(resp);
                break
            case "joinRoom":
                console.log("Joined\n" + resp.status.statusDesc);
                break
            case "chat":
                onChat(resp);
                break;
            case "getAllProducers":
                const remoteVideoSection = document.getElementById('remoteVideoSection');

                if (remoteVideoSection) remoteVideoSection.innerHTML = "";

                producers = resp.data.producers;
                pId2cId = {};
                for (let cId in producers) {
                    pId2cId[producers[cId]["video"]] = cId;
                    pId2cId[producers[cId]["audio"]] = cId;
                }
                subscribe();
                break;
            case "retrieveDetails":
                clientId = resp.data.clientId;
                console.log(`Your client ID is: ${clientId}`)
                break;
            default:
                break;
        }
    }

    socket.onopen = () => {
        getUserInfo();
        console.log("Connected!")
    }
}

const onSubConnected = (resp: any) => {
    console.log('sub connected ?')
    transportCallbacks[resp.data.transportId]()
}

const onProducerTransportCreated = async (event: any) => {
    if (event.error) {
        console.error('producer transport create error: ', event.error);
        return;
    }

    transport = device.createSendTransport(event.data.params)

    transport.on('connect', async ({ dtlsParameters }, callback, errback) => {
        const message = {
            type: 'connectTransport',
            data: {
                roomId: currRoomId,
                isProducer: true,
                transportId: transport.id,
                dtlsParameters: dtlsParameters
            }
        }

        const resp = JSON.stringify(message);
        socket.send(resp);
        transportCallbacks[transport.id] = callback;
    });

    //start transport on producer
    transport.on('produce', async ({ kind, rtpParameters }, callback, errback) => {
        const message = {
            //TODO: maybe this will help?
            type: 'produce',
            data: {
                roomId: currRoomId,
                clientId: clientId,
                transportId: transport.id,
                kind: kind,
                rtpParameters: rtpParameters
            }
        };
        const resp = JSON.stringify(message);
        callbacks[kind] = callback
        socket.send(resp);
    });
    // end transport producer

    // connection state change begin
    transport.on('connectionstatechange', (state) => {
        switch (state) {
            case 'connecting':
                console.log('publishing...')
                break;
            case 'connected':
                //localVideo.srcObject = stream;
                console.log('published')
                break;
            case 'failed':
                transport.close();
            default:
                console.log(state)
                break;
        }
    })
    // connection state change end

    let stream: any;
    try {
        stream = await getUserMedias(transport, isWebcam);
        console.log(stream)
        if (!isWebcam) {
            // sharing screen/system audio
            const track = stream.getVideoTracks()[0];
            console.log("DEBUG track: " + track.kind)

            const params = { track: track };
            producer = await transport.produce(params);

            // User may choose to share their screen, but not their audio. This is a fix for that.
            if (stream.getAudioTracks().length > 0) {
                const track2 = stream.getAudioTracks()[0];
                console.log("DEBUG track2: " + track2.kind)

                const params2 = { track: track2 };
                producer2 = await transport.produce(params2);
            }
        }
        else {
            // sharing microphone/webcam
            // necessary to separate audio/video tracks in case we want to share microphone, webcam, both or none
            if (stream.getAudioTracks().length > 0) {
                const track = stream.getAudioTracks()[0];
                console.log("DEBUG track: " + track.kind)

                const params = { track: track };
                producer = await transport.produce(params);
            }

            if (stream.getVideoTracks().length > 0) {
                const track2 = stream.getVideoTracks()[0];
                console.log("DEBUG track2: " + track2.kind)

                const params2 = { track: track2 };
                producer2 = await transport.produce(params2);
            }
        }

    } catch (error) {
        console.error(error);
    }
}

const onRouterCapbabilities = (resp: any) => {
    loadDevice(resp.data.rtpCapabilities);
}

const onConsumerTransportCreated = async (event: any) => {
    if (event.error) {
        console.error('consumer transport create error: ', event.error);
        return;
    }
    console.log(event.data.params);
    const transport = device.createRecvTransport(event.data.params);
    subTransportListen(transport);
}

const subTransportListen = async (transport: Transport) => {
    consumeTransport = transport;
    transport.on('connect', async ({ dtlsParameters }, callback: Function, errback: Function) => {
        const message = {
            type: 'connectTransport',
            data: {
                transportId: transport.id,
                dtlsParameters,
                roomId: currRoomId
            }
        }
        console.log('pog');
        const resp = JSON.stringify(message);
        socket.send(resp);
        transportCallbacks[transport.id] = callback;
    });
    transport.on('connectionstatechange', async (state) => {
        console.log(state)
        switch (state) {
            case 'connecting':
                break;
            case 'connected':
                console.log('subscribed');
                break;
            case 'failed':
                console.log("failed")
                transport.close();
                break;
            default:
                console.log("others")
                break;
        }
    });

    consume(transport.id);
}

const consume = async (tId: any) => {
    const { rtpCapabilities } = device;
    for (let cId in producers) {
        if (cId == clientId) {
            continue
        }
        if (producers[cId]["video"]) {
            console.log("DEBUG: " + producers[cId]["video"]);
            const video = {
                type: 'consume',
                data: {
                    roomId: currRoomId,
                    clientId,
                    producerId: producers[cId]["video"],
                    transportId: tId,
                    rtpCapabilities
                }
            };
            const vidResp = JSON.stringify(video);
            socket.send(vidResp);
        }
        console.log("DEBUG ------------------------")
        if (producers[cId]["audio"]) {
            console.log("DEBUG: " + producers[cId]["audio"]);
            const audio = {
                type: 'consume',
                data: {
                    roomId: currRoomId,
                    clientId,
                    producerId: producers[cId]["audio"],
                    transportId: tId,
                    rtpCapabilities
                }
            };

            const audResp = JSON.stringify(audio);
            socket.send(audResp);
        }
    }
}

const getAllProducers = async () => {
    const data = {
        type: 'getAllProducers',
        data: {
            roomId: currRoomId
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
            roomId: currRoomId
        }
    }

    const resp = JSON.stringify(data);
    socket.send(resp);
}

const onSubscribed = async (resp: any) => {
    const {
        producerId,
        transportId,
        id,
        kind,
        rtpParameters,
    } = resp.data;

    const consumer = await consumeTransport.consume({
        id,
        producerId,
        kind,
        rtpParameters
    });

    let waitingTrack: MediaStreamTrack | undefined = undefined;
    let stream: MediaStream | undefined = undefined;
    remoteStream = stream;
    streams[transportId] = stream;
    if (kind == "video") {
        const { track } = consumer
        stream = new MediaStream([track]);
        streams[pId2cId[producerId]] = stream;
        console.log('epicness')

        let videoSect = document.getElementById("remoteVideoSection")
        let videoDiv = document.createElement("div")
        videoDiv.className = "my-1 px-1 w-full overflow-hidden sm:my-px sm:px-px md:my-px md:px-px lg:my-1 lg:px-1 lg:w-1/2 xl:my-1 xl:px-1"
        let video = document.createElement("video")
        video.className = "w-full"
        video.setAttribute('controls', '')
        video.setAttribute('autoplay', '')
        video.setAttribute('playsinline', '')
        video.srcObject = stream
        videoDiv.appendChild(video)
        let remoteName = document.createTextNode(pId2cId[producerId] + ":")
        videoSect?.appendChild(remoteName)
        videoSect?.appendChild(videoDiv)

        if (waitingTrack) {
            streams[pId2cId[producerId]].addTrack(waitingTrack)
        }
    }
    else {
        if (!streams[pId2cId[producerId]]) {
            // If audio arrives behind video, put it into a buffer so that we always initialise audio AFTER video.
            // This fixes some weird issues with loading video.
            const { track } = consumer;
            waitingTrack = track;
        }
        else {
            streams[pId2cId[producerId]].addTrack(consumer.track);
        }
    }
    if (!streams[pId2cId[producerId]]) {
        // Stream not created. This is due to video not existing but audio existing.
        if (waitingTrack)
            stream = new MediaStream([waitingTrack]);
        streams[pId2cId[producerId]] = stream
        let videoSect = document.getElementById("remoteVideoSection")
        let videoDiv = document.createElement("div")
        videoDiv.className = "my-1 px-1 w-full overflow-hidden sm:my-px sm:px-px md:my-px md:px-px lg:my-1 lg:px-1 lg:w-1/2 xl:my-1 xl:px-1"
        let video = document.createElement("video")
        video.className = "w-full"
        video.setAttribute('controls', '')
        video.setAttribute('autoplay', '')
        video.setAttribute('playsinline', '')
        if (stream)
            video.srcObject = stream;
        videoDiv.appendChild(video)
        let remoteName = document.createTextNode(pId2cId[producerId] + ":")
        videoSect?.appendChild(remoteName)
        videoSect?.appendChild(videoDiv)
    }
}

const publish = (caller: string) => {
    isWebcam = caller === "cam";

    const message = {
        type: 'createTransport',
        data: {
            clientId: clientId,
            forceTcp: false,
            rtpCapabilities: device.rtpCapabilities,
            isProducer: true,
            roomId: currRoomId
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

function onRoomCreated(resp: any) {
    const { roomId } = resp.data
    currRoomId = roomId
    console.log("New room id is: " + currRoomId)
}

function joinRoom() {
    const roomId = document.getElementById("roomId") as HTMLInputElement | null;
    let temp = roomId ? roomId.value : undefined;
    if (temp) currRoomId = temp as unknown as number;
    socket.send(JSON.stringify({
        type: "joinRoom",
        data: {
            roomId: currRoomId,
            clientId: clientId
        }
    }))

    const msg = {
        type: "getRouterRtpCapabilities",
        data: {
            roomId: currRoomId
        }
    }
    const resp = JSON.stringify(msg);
    socket.send(resp);
}

function submitMessage() {
    socket.send(JSON.stringify({
        type: "chat",
        data: {

        }
    }))
}

function onChat(resp: any) {
    const { from, message } = resp.data
}

function leaveRoom() {
    socket.send(JSON.stringify({
        type: "leaveRoom",
        data: {
            roomId: currRoomId,
            clientId: clientId
        }
    }))
    currRoomId = -1
}

//==============
//
// misc
//
//==============

const IsJsonString = (str: string) => {
    try {
        JSON.parse(str);
    } catch (error) {
        return false;
    }
    return true;
}

const loadDevice = async (routerRtpCapabilities: RtpCapabilities) => {
    try {
        device = new mediasoup.Device();
    } catch (error: any) {
        console.log(error.name)
        if (error.name == 'UnsupportedError') {
            console.log('browser not supported!');
        }
    }
    await device.load({ routerRtpCapabilities });
}
let stream: MediaStream;
const getUserMedias = async (transport: Transport, isWebcam: boolean) => {
    if (!device.canProduce('video')) {
        console.error('cannot produce video');
        return;
    }
    try {
        if (isWebcam) {
            let stream1: MediaStream | undefined = undefined
            let stream2: MediaStream | undefined = undefined
            try {
                stream1 = await navigator.mediaDevices.getUserMedia({ audio: true });
                stream = stream1
            }
            catch (e) {
                console.log("Microphone not found")
            }
            try {
                stream2 = await navigator.mediaDevices.getUserMedia({ video: true })
                if (stream) {
                    stream.addTrack(stream2.getVideoTracks()[0])
                }
                else {
                    stream = stream2
                }
            }
            catch (e) {
                console.log("Webcam not found")
            }
            if (!stream1 && !stream2) throw 'No suitable user media found!';
            console.log("audio and video share");
        } else {
            stream = await getScreenShare();
            console.log('got', stream.getTracks());
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
    return stream;
}

function getUserInfo() {
    // Currently unpopulated. Once user database stuff is done, populate data with the user's info, and remember
    // to grab the info on the server side.
    const msg = {
        type: 'retrieveDetails',
        data: {

        }
    }
    socket.send(JSON.stringify(msg));
}

async function getScreenShare() {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    if (stream.getTracks().length == 1) {
        // Shared screen, but no audio.
        return new MediaStream([stream.getTracks()[0]])
    }
    return new MediaStream([stream.getVideoTracks()[0], stream.getAudioTracks()[0]]);
}

// We'll be needing these, probably.
// Remove as required.
export { connect, createRoom, joinRoom, submitMessage, leaveRoom, getAllProducers, publish, getScreenShare }
