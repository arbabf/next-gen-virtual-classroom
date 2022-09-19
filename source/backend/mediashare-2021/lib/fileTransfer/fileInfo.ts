import { generateByTime } from "../numGenerator";

export class FileInfo {
    private fileId: string;
    private name: string;
    private size: number;
    private uploaderId: string;
    private uploadTime: number|null;

    // number of chunks in total
    private totalChunks: number;
    // number of chunks received
    private crtReceived: Set<number> = new Set();

    constructor(name: string, size: number, uploaderId: string, numChunks: number = 1) {
        this.name = name
        this.size = size
        this.fileId = generateByTime(1e8).toString()
        this.uploaderId = uploaderId
        this.uploadTime = null
        this.totalChunks = numChunks
    }

    receives(chunkId: number) {
        if (!this.isAllReceived()) {
            this.crtReceived.add(chunkId)
            if (this.crtReceived.size == this.totalChunks) {
                this.uploadTime = new Date().getTime()
            }
        }
    }

    isAllReceived(): boolean {
        return this.uploadTime !== null
    }

    getInfo(): any {
        return {
            fileName: this.name,
            fileId: this.fileId,
            fileSize: this.size,
            uploaderId: this.uploaderId,
            uploadTime: this.uploadTime,
            totalChunks: this.totalChunks
        }
    }

    getFileId(): string {
        return this.fileId
    }

    getMissedChunks() {
        const missed = []
        for(let i = 0; i < this.totalChunks; i++) {
            if (!this.crtReceived.has(i)) {
                missed.push(i)
            }
        }
        return missed
    }

    getTotalChunks() {
        return this.totalChunks
    }
}