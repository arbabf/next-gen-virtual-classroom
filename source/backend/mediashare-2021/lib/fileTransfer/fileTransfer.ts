/** 
 * WebSocket way
 * 
 *      Client         Middle          Backend            
 *        |               |               |
 * ====================UPLOADS====================
 *        |               |               |
 *        |-------------->|               |     Request (file name, size), assign and insert {file name: {file id, size}}
 *        |               |-------------->|     Request (file id, size)
 *        |<--------------|<--------------|     Response (file id)
 *        |               |               |     
 *        |               |               |
 *        |-------------->|-------------->|     this? (via us to upload) √
 *        |               |               |     
 *        |               |               |
 *        |      ...      |      ...      |
 *        |               |               |
 *        |               |               |
 *        |               |               |
 * ===================DOWNLOADS=================== 
 *        |               |               |
 *        |-------------->|               |     Query all available files
 *        |<--------------|               |     (file id, file name, size)
 *        |               |               |
 *        |               |               |
 *        |-------------->|               |     Request (file id)
 *        |               |-------------->|     Request if this file id exist
 *        |<--------------|<--------------|
 *        |      ...      |      ...      |
 *        |               |               |
 *        |               |               |
 *        V               V               V
 * 
 */

import { InvalidStateError } from "mediasoup/node/lib/errors";
import WebSocket from "ws";
import { config } from "../../config";
import { types } from "../misc/types";
import { Room, roomManager } from "../room";
import { FileInfo } from "./fileInfo";


const backendAddress = ""

// this should run in another thread. (or use threads pool)
export const fileTransferDispatcher = (event: any, ws: WebSocket) => {
    let responseData:any = {};

    // subclass of request type
    // fileTransfer.upload
    //              ^----- this part
    switch (event.type.split(".")[1]) {
        case types.fileTransfers.uploadRequest:
            responseData = onUploadRequest(event)
            break
        case types.fileTransfers.upload:
            responseData = onUploading(event)
            break
        case types.fileTransfers.queryFiles:
            responseData = queryFiles(event)
            break
        case types.fileTransfers.download:
            responseData = onDownloading(event)
            break
        default:
            console.error(`${event.type} is not a valid request type`);
            throw new InvalidStateError(`${event.type} is not a valid request type`)
    }

    return responseData
}

const onUploadRequest = (event: any) => {
    // fileSize: file size in MB
    // numChunks: number of chunks (divide the large file to small binary chunks)
    const { fileName, fileSize, roomId, clientId, numChunks } = event.data
    const theNumChunks = parseInt(numChunks)
    const theFileSize = parseFloat(fileSize)

    const room: Room = roomManager.findRoomById(roomId)

    // Add file to the room.
    const crtFileInfo = new FileInfo(fileName, theFileSize, clientId, theNumChunks)
    const fileId = crtFileInfo.getFileId()

    if (room.isFileExisted(fileId)) {
        throw new InvalidStateError("File name existed")
    } else {
        room.addFile(fileId, crtFileInfo)
    }

    // TODO: notify the backend
    // Blocking until get the response from backend.

    return {fileId: fileId}
}

const queryFiles = (event: any) => {
    const { roomId } = event.data

    const room = roomManager.findRoomById(roomId)
    const files: any[] = []
    // all files info
    room.forEachFile((fileInfo) => {
        if (fileInfo.isAllReceived()) { files.push(fileInfo.getInfo()) }
    })
    return {files: files}
}

const onUploading = (event: any) => {
    // check the fileId first, and authToken
    // get from client and send to backend directly
    // also, have to keep track of missing parts.

    // chunkId: id of the chunk (range from 0 to numChunks-1)
    // rawData: binary data of the file
    const { roomId, fileId, chunkId, rawData } = event.data

    const room = roomManager.findRoomById(roomId)
    const fileInfo = room.getFileInfo(fileId)

    let retries = 0
    while (retries < config.fileTransfer.maxRetries) {
        // TODO: send raw data to backend (packageId, rawData) and get response
        // const { isSuccess } = 
        const isSuccess = true
        // blocking wait

        // if backend returns success
        if (isSuccess) {
            fileInfo.receives(chunkId)
            break
        } else {
            retries++
        }
    }

    if (retries == config.fileTransfer.maxRetries) {
        // else, not successful in given number of trys
        throw new InvalidStateError(`Can not upload to the server after ${config.fileTransfer.maxRetries} tries`)
    }

    // when success:
    return {}
}

const onDownloading = (event: any) => {
    // check the fileId first, and authToken
    // get from backend and send to client directly

    // request for downloading a specific chunk
    const { roomId, fileId, chunkId } = event.data
    const room = roomManager.findRoomById(roomId)
    if (!room.isFileExisted(fileId)) {
        throw new InvalidStateError("File not found")
    }

    const fileInfo = room.getFileInfo(fileId)
    if (fileInfo.getTotalChunks() > chunkId) {
        throw new InvalidStateError("No such chunk")
    }

    if (fileInfo === undefined) {
        throw new InvalidStateError("File is not exist")
    }

    // TODO: get raw data of this chunk from the backend (rawData)
    // const { rawData } = 
    // wait for __ seconds, if not response after __ seconds, returns error.
    const rawData = ""

    return {rawData: rawData}
}

