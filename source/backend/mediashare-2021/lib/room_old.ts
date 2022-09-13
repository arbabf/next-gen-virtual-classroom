import { Consumer } from "mediasoup/lib/Consumer";
import { InvalidStateError } from "mediasoup/lib/errors";
import { Producer } from "mediasoup/lib/Producer";
import { MediaKind, RtpCapabilities, RtpParameters } from "mediasoup/lib/RtpParameters";
import { Transport } from "mediasoup/lib/Transport";
import { DtlsParameters } from "mediasoup/lib/WebRtcTransport";
import WebSocket from "ws";
import { config } from "../config";
import { createWebRtcTransport } from "./createWebrtcTransport";
import { FileInfo } from "./fileTransfer/fileInfo";
import { RouterObject } from "./router";

// OPTIONAL: 
// Can be changed to Room Class and moves all functions to this class,
// rooms stores Room Objects.
type Room = {
    id: string,                             // room id
    routerObject: RouterObject,             // router and its info
    producerTransports: Array<Transport>,   // producer transports
    consumerTransports: Array<Transport>,   // consumer transports
    sockets: Map<String, WebSocket>,        // client's sockets, use it to send data back
    producers: Array<Producer>,             // producers
    consumers: Array<Consumer>,             // consumers
    files: Map<string, FileInfo>,           // {fileId: FileInfo}
    AuthTokens: Map<String, String>         // {userId: authToken}
}

const rooms: Array<Room> = []
const addNewRoom = (id: string, routerObject: RouterObject) => {
    rooms.push({
        id: id, 
        routerObject: routerObject, 
        producerTransports: [],
        consumerTransports: [],
        sockets: new Map(),
        producers: [],
        consumers: [],
        files: new Map(),
        AuthTokens: new Map()
    })
}

/**
 * Find the room object by room id.
 * Once a room created it has a assigned id.
 * 
 * @param id room id
 * @returns room if found, otherwise throw an error.
 */
const findRoomById = (roomId: string):Room => {
    for (let r of rooms) {
        if (r.id == roomId) {
            //if (config.debug) console.log(`[findRoomById] Room ${roomId} found successfully`);
            return r
        }
    }
    if (config.debug) console.log(`[findRoomById] Room ${roomId} not found`);
    throw new InvalidStateError(`Room ${roomId} not found`)
} 

/**
 * Put the client to the room, 
 * Also, call it to update client's websocket if needed.
 * 
 * @param room Room object
 * @param clientId 
 * @param socket 
 */
const joinRoom = (room: Room, clientId: String, socket: WebSocket) => {
    room.sockets.set(clientId, socket)
}

const leaveRoom = (room: Room, clientId: String, consumerId: String = "", producerId: String = "") => {
    room.sockets.delete(clientId)
    if (consumerId.length > 0) {
        room.consumers = room.consumers.filter(c => c.id != consumerId)
    }
    if (producerId.length > 0) {
        room.producers = room.producers.filter(p => p.id != producerId)
    }

    if (room.sockets.size == 0) {
        // TODO: close/clear this room/router.
    }
}

const createTransport4Room = async (room: Room, isProduce: boolean) => {
    const {transport, params} = await createWebRtcTransport(room.routerObject.router)
    if (isProduce) {
        room.producerTransports.push(transport)
    } else {
        room.consumerTransports.push(transport)
    }
    return params
}

const connectTransport4Room = async (room: Room, transportId: string, dtlsParams: DtlsParameters, isProduce: boolean) => {
    getTransport(room, transportId, isProduce).connect({ dtlsParams })
}

const onProduce4Room = async (room: Room, transportId: string, kind: MediaKind, rtpParameters: RtpParameters) => {
    const producer = await getTransport(room, transportId, true).produce({kind, rtpParameters}) 
    room.producers.push(producer)
    return { producerId: producer.id }
}

const onConsume4Room = async (room: Room, transportId: string, producerId: string, rtpCapabilities: RtpCapabilities) => {
    if (!room.routerObject.router.canConsume({producerId, rtpCapabilities})) {
        throw new InvalidStateError("can not consume")
    }

    const consumer = await getTransport(room, transportId, false).consume({producerId, rtpCapabilities})
    room.consumers.push(consumer)

    if (consumer.type === 'simulcast') {
        await consumer.setPreferredLayers({ spatialLayer: 2, temporalLayer: 2});
    }

    return {
        producerId: producerId,
        id: consumer.id,
        kind: consumer.kind,
        rtpParameters: consumer.rtpParameters,
        type: consumer.type,
        producerPaused: consumer.producerPaused
    }
}

const onResume4Room = async (room: Room, producerId: string) => {
    const filtered = room.producers.filter(p => p.id == producerId)

    if (filtered.length == 0) {
        throw new InvalidStateError("clientId not found")
    } else {
        filtered[0].resume()
    }
}

const getTransport = (room: Room, transportId: string, isProduce: boolean): Transport => {
    let filtered = [];
    if (isProduce) {
        filtered = room.producerTransports.filter(t => t.id == transportId)
    } else {
        filtered = room.consumerTransports.filter(t => t.id == transportId)
    }

    if (filtered.length == 0) {
        throw new InvalidStateError("clientId not found")
    } else {
        return filtered[0]
    }
}

/**
 * 
 * @param room Room object
 * @param fromClient Sender's id
 * @param jsonString JSON string of the key-value object, e.g. JSON.stringify({...})
 */
const broadCastJSONString = (room: Room, fromClient: String, jsonString: string) => {
    room.sockets.forEach((s, key) => key==fromClient? {} : s.send(jsonString))
}

/**
 * 
 * @param room Room object
 * @param fromClient Sender's id
 * @param jsonObj a key-value object, e.g. { clientName: "someone", message: "the message", something else... }
 */
const broadcastObject = (room: Room, fromClient: String, jsonObj: any) =>
    broadCastJSONString(room, fromClient, JSON.stringify(jsonObj))

const varifyUser = (room: Room, userId: String, userToken: String) => room.AuthTokens.get(userId) == userToken


/*
export {
    Room, 
    findRoomById, 
    addNewRoom,
    createTransport4Room,
    connectTransport4Room,
    onProduce4Room,
    onConsume4Room,
    onResume4Room,
    joinRoom,
    leaveRoom,
    broadCastJSONString,
    broadcastObject,
    varifyUser,
}
*/