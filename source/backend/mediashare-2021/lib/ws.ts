import { json } from "express";
import WebSocket from "ws";
import { createRouter } from "./router";
import { config } from "../config";
import { roomManager } from "./room";
import { statuses } from "./misc/statuses";
import { types } from "./misc/types";
import { fileTransferDispatcher } from "./fileTransfer/fileTransfer";

const WebsocketConnection = async (websock: WebSocket.Server) => {
    websock.on('connection', (ws: WebSocket) => {
        ws.on('message', (message: string) => {
            const jsonValidation = IsJsonString(message);
            if (!jsonValidation){
                console.error("json error");
                return
            }
            const event = JSON.parse(message);
            // read the first level
            // i.e. type: fileTransfer.upload
            //            ^----------^ this part
            switch (event.type.split(".", 1)[0]) {
                case types.getRouterRtpCapabilities:
                    onRouterRtpCapabilities(event, ws);
                    break;
                case types.createTransport:
                    onCreateTransport(event, ws);
                    break;
                case types.connectTransport:
                    onConnectTransport(event, ws);
                    break;
                case types.produce:
                    onProduce(event, ws);
                    break;
                case types.consume:
                    onConsume(event, ws);
                    break;
                case types.resume:
                    onResume(event, ws);
                    break;
                case types.createRoom:
                    onCreateRoom(event, ws)
                    break;
                case types.joinRoom:
                    onJoinRoom(event, ws)
                    break;
                case types.leaveRoom:
                    onLeaveRoom(event, ws)
                    break;
                case types.chat:
                    onChat(event, ws)
                    break;
                case types.fileTransfer:
                    onFileTransfer(event, ws)
                    break
                case types.getAllProducers:
                    onGetAllProducers(event, ws)
                    break
                default:
                    break;
            }
        })
    });

    /*
        Get userToken list from backend.
        Add userToken for security check for all functions (check the list locally).
        Update the userToken list every __ mins (ask backend to get).

        if (varifyUser(room, userId, authToken)) {
            valid user
            ...
        } else {
            response an error (statuses.VERIFICATION_FAILED)
        }
    */

    
    const onProduce = async (event: any, ws: WebSocket) => {
        // unpack the data from key "data" of the request.
        const { roomId, clientId, transportId, kind, rtpParameters } = event.data
        try{
            // if no error, v success,    v same as the request type
            console.log("extremely poggers" + kind);
            send(ws, statuses.SUCCESS, types.produce, 
                await roomManager.onProduce(roomId, clientId, transportId, kind, rtpParameters))
            //  ^ return {producer id}
        } catch (e) {
            console.error(e);
            const status = statuses.ERROR
            // replace the status description with the message of the error.
            status.statusDesc = e instanceof Error? e.message : statuses.ERROR.statusDesc
            send(ws, status, types.produce)
        }
    }

    const onConsume = async (event: any, ws: WebSocket) => {
        const { roomId, clientId, transportId, producerId, rtpCapabilities } = event.data
        try{
            send(ws, statuses.SUCCESS, types.consume, 
                await roomManager.onConsume(roomId, clientId, transportId, producerId, rtpCapabilities))
        } catch (e) {
            console.error(e);
            const status = statuses.ERROR
            status.statusDesc = e instanceof Error? e.message : statuses.ERROR.statusDesc
            send(ws, status, types.consume)
        }
    }

    const onResume = async (event: any, ws: WebSocket) => {
        const { roomId, id, isProducer } = event.data
        try {
            roomManager.onResume(roomId, id, isProducer)
            send(ws, statuses.SUCCESS, types.resume)
        } catch (e) {
            console.error(e);
            const status = statuses.ERROR
            status.statusDesc = e instanceof Error? e.message : statuses.ERROR.statusDesc
            send(ws, status, types.resume)
        }
    }

    const onCreateTransport = async (event: any, ws: WebSocket) => {
        const { roomId, clientId, isProducer } = event.data
        try {
            send(ws, statuses.SUCCESS, types.createTransport, await roomManager.createTransport(roomId, clientId, isProducer))
            if (config.debug) console.log(`[ws.onCreateTransport] A transpord created (room: ${roomId}, isProducer: ${isProducer})`)
        } catch (e) {
            console.error(e);
            const status = statuses.ERROR
            status.statusDesc = e instanceof Error? e.message : statuses.ERROR.statusDesc
            send(ws, status, types.createTransport)
        }
    }

    const onConnectTransport = async (event: any, ws: WebSocket) => {
        const { roomId, transportId,  dtlsParameters } = event.data
        try {
            roomManager.connectTransport(roomId, transportId,  dtlsParameters)
            if (config.debug) console.log(`[ws.onConnectTransport] Transpord ${transportId} connected (room ${roomId})`)
            send(ws, statuses.SUCCESS, types.connectTransport, {transportId})
        } catch (e) {
            console.error(e);
            const status = statuses.ERROR
            status.statusDesc = e instanceof Error? e.message : statuses.ERROR.statusDesc
            send(ws, status, types.connectTransport)
        }
    }

    const onRouterRtpCapabilities = (event: any, ws: WebSocket) => {
        const { roomId } = event.data
        try {
            send(ws, statuses.SUCCESS, types.getRouterRtpCapabilities, 
                { rtpCapabilities: roomManager.getRtpCapabilities(roomId) })
        } catch (e) {
            send(ws, statuses.ROOM_NOT_FOUND, types.getRouterRtpCapabilities)
        }
    }

    const onCreateRoom = async (event: any, ws: WebSocket) => {
        try{
            const roomId = await createRouter()
            if (config.debug) console.log(`[ws.onCreateRoom] Room ${roomId} created`)
            send(ws, statuses.SUCCESS, types.createRoom, {roomId: roomId})
        } catch(e) {
            console.error(e);
            const status = statuses.ERROR
            status.statusDesc = e instanceof Error? e.message : statuses.ERROR.statusDesc
            send(ws, status, types.createRoom)
        }
    }

    // queryRoomInfo
    // return data: {Title, Overview, DateTime, Admins, ...}

    const onJoinRoom = async (event: any, ws: WebSocket) => {
        const { roomId, clientId } = event.data
        try{
            roomManager.joinRoom(roomId, clientId, ws)
            if (config.debug) console.log(`[ws.onJoinRoom] Client ${clientId} joined Room ${roomId}`)
            send(ws, statuses.SUCCESS, types.joinRoom)
        } catch(e) {
            send(ws, statuses.ROOM_NOT_FOUND, types.joinRoom)
        }
    }

    const onLeaveRoom = async (event: any, ws: WebSocket) => {
        const { roomId, clientId } = event.data
        try{
            roomManager.leaveRoom(roomId, clientId)
            if (config.debug) console.log(`[ws.onLeaveRoom] Client ${clientId} leaved Room ${roomId}`)
            send(ws, statuses.SUCCESS, types.leaveRoom)
        } catch(e) {
            send(ws, statuses.ROOM_NOT_FOUND, types.leaveRoom)
        }
    }

    const onChat = async (event: any, ws: WebSocket) => {
        const {roomId, clientId, message} = event.data
        roomManager.broadcastObject(roomId, clientId, {
            type: types.chat,
            data: {
                from: clientId, 
                message: message,
                //timestamp if needed
            }
        })
    }

    const onFileTransfer = async (event: any, ws: WebSocket) => {
        try{
            // let the file transfer dispatcher do the remaining stuff.
            const responseData = fileTransferDispatcher(event, ws)
            send(ws, statuses.SUCCESS, event.type, responseData)
        } catch(e) {
            console.error(e);
            const status = statuses.ERROR
            status.statusDesc = e instanceof Error? e.message : statuses.ERROR.statusDesc
            send(ws, status, event.type)
        }
    }

    const onGetAllProducers = async (event: any, ws: WebSocket) => {
        try{
            const {roomId} = event.data
            send(ws, statuses.SUCCESS, event.type, roomManager.getAllProducers(roomId))
        } catch(e) {
            console.error(e);
            send(ws, statuses.ROOM_NOT_FOUND, event.type)
        }
    }


    const IsJsonString = (str: string) => {
        try {
            JSON.parse(str)
        } catch (error) {
            return false;
        }
        return true;
    }

    /**
     * 
     * @param ws The WebSocket to client/others
     * @param status Status of success or error
     * @param type Type of request
     * @param data the data sent back, in Object key-value format, i.e. {key: value}.
     */
    const send = (ws: WebSocket, status: any, type: string, data: any=null) => {
        const message = {
            status: status,
            type: type,
            data: data
        }

        const resp = JSON.stringify(message);
        ws.send(resp);
    }
}

export {WebsocketConnection}
