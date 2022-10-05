import { Consumer } from "mediasoup/node/lib/Consumer";
import { InvalidStateError } from "mediasoup/node/lib/errors";
import { Producer } from "mediasoup/node/lib/Producer";
import { MediaKind, RtpCapabilities, RtpParameters } from "mediasoup/node/lib/RtpParameters";
import { Transport } from "mediasoup/node/lib/Transport";
import { DtlsParameters } from "mediasoup/node/lib/WebRtcTransport";
import { stringify } from "querystring";
import WebSocket from "ws";
import { config } from "../config";
import { createWebRtcTransport } from "./createWebrtcTransport";
import { FileInfo } from "./fileTransfer/fileInfo";
import { RouterObject } from "./router";

/**
 * Room
 */
class Room {
    private id: string;                                     // room id, same as the router id.
    private routerObject: RouterObject                      // router and its info
    private producerTransports: Array<Transport> = [];      // producer transports
    private consumerTransports: Array<Transport> = [];      // consumer transports
    private transports: Array<Transport> = [];
    private sockets: Map<String, WebSocket> = new Map();    // client's sockets, use it to send data back
    private producers: Array<Producer> = [];                // producers
    private consumers: Array<Consumer> = [];                // consumers
    private files: Map<string, FileInfo> = new Map();       // {fileId: FileInfo}
    private AuthTokens: Map<String, String> = new Map();    // {userId: authToken}

    constructor(id: string, routerObject: RouterObject) {
        this.id = id;
        this.routerObject = routerObject;
    }

    /**
     * Check the given room id is the same as ours, or not.
     * 
     * @param id Input room id
     * @returns TRUE, if matches.
     */
    isThisRoom(id: string): boolean {
        return this.id == id; 
    }

    /**
     * Put the client to the room, 
     * Also, call it to update client's websocket if needed.
     * 
     * @param clientId Unique client id.
     * @param socket The websocket used to communicate (Long connection).
     */
    joinRoom(clientId: String, socket: WebSocket) {
        this.sockets.set(clientId, socket)
    }

    /**
     * Leaves the room, remove this user from the this.
     * 
     * @param clientId Unique client id.
     * @param consumerId Transport (consumer) id 
     * @param producerId Transport (producer) id
     * @returns True if room is not empty.
     */
    leaveRoom(clientId: String):boolean {
        const closeAndReturnFalse = (t: Transport|Producer|Consumer) => {
            if (t.appData.clientId == clientId && !t.closed) {
                t.close()
            }
            return t.appData.clientId != clientId
        }

        this.consumers = this.consumers.filter(closeAndReturnFalse)
        
        this.producers = this.producers.filter(closeAndReturnFalse)

        this.transports = this.transports.filter(closeAndReturnFalse)

        this.sockets.delete(clientId)

        return this.sockets.size != 0;
    }

    /**
     * Create WebRTC transports
     * 
     * @param isProduce 
     * @returns 
     */
    async createTransport(clientId: string, isProduce: boolean) {
        const {transport, params} = await createWebRtcTransport(this.routerObject.router, clientId, isProduce);
        this.transports.push(transport);

        return {isProducer: isProduce, params};
    }

    /**
     * Connect to a exist transport
     * 
     * @param transportId 
     * @param dtlsParams 
     * @param isProduce 
     */
    async connectTransport(transportId: string, dtlsParams: DtlsParameters) {
        this.getTransport(transportId).connect({ dtlsParameters: dtlsParams });
    }

    /**
     * Producing video/audio
     * 
     * @param transportId 
     * @param kind 
     * @param rtpParameters 
     * @returns 
     */
    async onProduce(clientId: string, transportId: string, kind: MediaKind, rtpParameters: RtpParameters) {
        const producer = await this.getTransport(transportId).produce({kind, rtpParameters, appData: {clientId}});
        this.producers.push(producer);
        console.log(roomManager.getAllProducers(this.id))
        producer.on("transportclose", () => {
            this.producers = this.producers.filter((p) => p.id != producer.id)
            if (!producer.closed) {
                producer.close()
            }
        });

        return { producerId: producer.id, kind };
    }

    /**
     * Consuming others video/audio.
     * 
     * @param transportId 
     * @param producerId 
     * @param rtpCapabilities 
     * @returns 
     */
    async onConsume(clientId: string, transportId: string, producerId: string, rtpCapabilities: RtpCapabilities) {
        if (!this.routerObject.router.canConsume({producerId, rtpCapabilities})) {
            throw new InvalidStateError("can not consume");
        }

        const consumer = await this.getTransport(transportId).consume({producerId, rtpCapabilities, appData: {clientId}});
        this.consumers.push(consumer);

        consumer.on("producerclose", () => {
            this.consumers = this.consumers.filter((c) => c.id != consumer.id)
            if (!consumer.closed) {
                consumer.close()
            }
        });

        consumer.on("transportclose", () => {
            this.consumers = this.consumers.filter((c) => c.id != consumer.id)
            if (!consumer.closed) {
                consumer.close()
            }
        });

        if (consumer.type === 'simulcast') {
            await consumer.setPreferredLayers({ spatialLayer: 2, temporalLayer: 2});
        }

        return {
            producerId: producerId,
            id: consumer.id,
            transportId,
            kind: consumer.kind,
            rtpParameters: consumer.rtpParameters,
            type: consumer.type,
            producerPaused: consumer.producerPaused
        };
    }

    /**
     * Resume the state
     * 
     * @param producerId 
     */
    async onResume(id: string, isProducer: boolean) {
        const filtered = isProducer? this.producers.filter(p => p.id == id) : this.consumers.filter(p => p.id == id);

        if (filtered.length == 0) {
            throw new InvalidStateError("clientId not found");
        } else {
            filtered.forEach(t => t.resume());
        }
    }

    /**
     * Find the transport in this room by its id.
     * 
     * @param transportId 
     * @param isProduce 
     * @returns 
     */
    private getTransport(transportId: string):Transport {
        let filtered = [];
        filtered = this.transports.filter(t => t.id == transportId);

        if (filtered.length == 0) {
            throw new InvalidStateError("clientId not found");
        } else {
            return filtered[0];
        }
    }

    /**
     * Broadcast the JSON string to all clients except the sender.
     * 
     * @param room Room object
     * @param fromClient Sender's id
     * @param jsonString JSON string of the key-value object, e.g. JSON.stringify({...})
     */
    broadCastJSONString(fromClient: String, jsonString: string) {
        this.sockets.forEach((s, key) => key==fromClient? {} : s.send(jsonString));
    }

    /**
     * Broadcast the "JSON" object to all clients except the sender.
     * 
     * @param room Room object
     * @param fromClient Sender's id
     * @param jsonObj a key-value object, e.g. { clientName: "someone", message: "the message", something else... }
     */
    broadcastObject(fromClient: String, jsonObj: any) {
        this.broadCastJSONString(fromClient, JSON.stringify(jsonObj));
    }

    /**
     * Close this room, (close the router)
     */
    close() {
        this.routerObject.router.close();
    }

    /**
     * get the RTP capabilities from the room router.
     */
    getRtpCapabilities() {
        return this.routerObject.router.rtpCapabilities
    }
    
    /**
     * To find if such file existed.
     * 
     * @param fileId 
     * @returns 
     */
    isFileExisted(fileId: string): boolean {
        return this.files.has(fileId);
    }

    /**
     * Get the file info by file id.
     * 
     * @param fileId 
     * @returns 
     */
    getFileInfo(fileId: string): FileInfo {
        return this.files.get(fileId)!;
    }

    /**
     * Store the file info
     * 
     * @param fileId 
     * @param fileInfo 
     */
    addFile(fileId: string, fileInfo: FileInfo) {
        this.files.set(fileId, fileInfo);
    }

    /**
     * Do somethings upon the files.
     * 
     * @param func the function applies to all files.
     */
    forEachFile(func: (f:FileInfo) => void) {
        this.files.forEach(func);
    }

    /**
     * Get all producers in this room. {client id: producer id}
     */
    getAllProducers() {
        let producers: any = {}
        this.producers.forEach((p: Producer) => {
            const ad = p.appData as Record<string, string>;
            if (!producers[ad.clientId]) {
                producers[ad.clientId] = {}
            }
            console.log("DEBUG KIND: " + p.kind)
            producers[ad.clientId][p.kind] = p.id 
        })
        return {producers}
    }
}

/**
 * Manage all rooms and operations, scope limits to this file only.
 */
class RoomManager {
    // All rooms
    private rooms: Array<Room> = new Array();

    constructor() {}

    /**
     * Add a new room to rooms.
     * 
     * @param id A unique room id.
     * @param routerObject 
     */
    addNewRoom(id: string, routerObject: RouterObject) {
        this.rooms.forEach((r) => {
            if (r.isThisRoom(id)) {
                throw new InvalidStateError("Room id existed!")
            }
        })
        this.rooms.push(new Room(id, routerObject));
    }

    /**
     * Find the room object by room id.
     * Once a room created it has a assigned id.
     * 
     * @param roomId room id
     * @returns room if found, otherwise throw an error.
     */
    findRoomById(roomId: string): Room {
        for (let r of this.rooms) {
            if (r.isThisRoom(roomId)) {
                //if (config.debug) console.log(`[findRoomById] Room ${roomId} found successfully`);
                return r
            }
        }
        if (config.debug) console.log(`[findRoomById] Room ${roomId} not found`);
        throw new InvalidStateError(`Room ${roomId} not found`)
    }

    /**
     * Join a specific room
     * 
     * @param roomId 
     * @param clientId 
     * @param socket 
     */
    joinRoom(roomId: string, clientId: String, socket: WebSocket) {
        this.findRoomById(roomId).joinRoom(clientId, socket);
    }

    /**
     * Leave the room, remove the user from the room.
     * If the room is empty, close it.
     * 
     * @param roomId 
     * @param clientId 
     * @param consumerId 
     * @param producerId 
     */
    leaveRoom(roomId: string, clientId: String) {
        const room = this.findRoomById(roomId);
        // do leave room and check if no body in this room.
        if (!room.leaveRoom(clientId)) {
            // close this room
            room.close();
            this.rooms = this.rooms.filter((r) => r != room);
        }
    }

    /**
     * Create a WebRTC transport inside the room
     * 
     * @param roomId 
     * @param isProduce 
     * @returns 
     */
    async createTransport(roomId: string, clientId: string, isProduce: boolean) {
        return this.findRoomById(roomId).createTransport(clientId, isProduce);
    }

    /**
     * Connect to a exist transport inside the room
     * 
     * @param roomId room id.
     * @param transportId 
     * @param dtlsParams 
     * @param isProduce 
     */
    async connectTransport(roomId: string, transportId: string, dtlsParams: DtlsParameters) {
        this.findRoomById(roomId).connectTransport(transportId, dtlsParams);
    }

    /**
     * Producing video/audio in the room
     * 
     * @param roomId room id.
     * @param transportId 
     * @param kind 
     * @param rtpParameters 
     * @returns 
     */
    async onProduce(roomId: string, clientId: string, transportId: string, kind: MediaKind, rtpParameters: RtpParameters) {
        return this.findRoomById(roomId).onProduce(clientId, transportId, kind, rtpParameters);
    }

    /**
     * Consuming others video/audio in the room.
     * 
     * @param roomId room id.
     * @param transportId 
     * @param producerId 
     * @param rtpCapabilities 
     * @returns 
     */
    async onConsume(roomId: string, clientId: string, transportId: string, producerId: string, rtpCapabilities: RtpCapabilities) {
        return this.findRoomById(roomId).onConsume(clientId, transportId, producerId, rtpCapabilities);
    }

    /**
     * Resume the state
     * 
     * @param roomId room id.
     * @param producerId 
     */
    async onResume(roomId: string,  id: string, isProducer: boolean) {
        this.findRoomById(roomId).onResume(id, isProducer);
    }

    /**
     * Broadcast the "JSON" object to all clients except the sender inide the room.
     * 
     * @param roomId room id.
     * @param fromClient Sender's id
     * @param jsonObj a key-value object, e.g. { clientName: "someone", message: "the message", something else... }
     */
    broadcastObject(roomId: string, fromClient: String, jsonObj: any) {
        this.findRoomById(roomId).broadcastObject(fromClient, jsonObj);
    }

    /**
     * get the RTP capabilities from the room router.
     * 
     * @param roomId room id.
     */
    getRtpCapabilities(roomId: string) {
        return this.findRoomById(roomId).getRtpCapabilities();
    }
    
    /**
     * Get all producers in this room. {client id: producer id}
     * Use this func to get the producer id for the subscription.
     */
    getAllProducers(roomId: string) {
        return this.findRoomById(roomId).getAllProducers();
    }
}

// Shares the same instance of room manager.
// use this one to access room 
const roomManager = new RoomManager();

export {roomManager, Room}
