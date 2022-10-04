export const types = {
    getRouterRtpCapabilities: "getRouterRtpCapabilities",
    createTransport: "createTransport",
    connectTransport: "connectTransport",
    produce: "produce",
    consume: "consume",
    resume: "resume",
    createRoom: "createRoom",
    joinRoom: "joinRoom",
    leaveRoom: "leaveRoom",
    chat: "chat",
    fileTransfer: "file",
    fileTransfers: {
        // Uploading
        uploadRequest: "uploadRequest",
        upload: "upload",
        // Downloading
        queryFiles: "queryFiles",
        download: "download",
    },
    getAllProducers: "getAllProducers",
    retrieveDetails: "retrieveDetails"
}