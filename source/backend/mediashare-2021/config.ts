import { RtpCodecCapability } from 'mediasoup/lib/RtpParameters';
import { TransportListenIp } from 'mediasoup/lib/Transport';
import { WorkerLogTag } from 'mediasoup/lib/Worker';
import os from 'os';

export const config = {
    listenIp: '0.0.0.0',
    listenPort: 8002,

    debug: true,        // TODO: remember to set it to false at the end

    mediasoup: {
        maxRouterPerWorker: 10,
        maxWorkers: Object.keys(os.cpus()).length,
        numWorkers: Object.keys(os.cpus()).length,
        worker: {
            rtcMinPort: 10000,
            rtcMaxPort: 10100,
            logLevel: 'error',
            logTags: [
                'info',
                'ice',
                'dtls',
                'rtp',
                'srtp',
                'rtcp',
            ] as WorkerLogTag[],
        },
        router: {
            mediaCodes: [
                {
                    kind: 'audio',
                    mimeType: 'audio/opus',
                    clockRate: 48000,
                    channels: 2
                },
                {
                    kind: 'video',
                    mimeType: 'video/vP8',
                    clockRate: 90000,
                    parameters: {
                        'x-google-start-bitrate': 1080
                    }
                },
            ] as RtpCodecCapability[]
        },
        // webrtctransport settings
        webRtcTransport: {
            listenIps: [
                {
                    ip: '0.0.0.0',
                    announcedIp: '10.0.2.15' // replace with public IP address
                },
            ] as TransportListenIp[],
            maxIncomeBitrate: 1500000,
            initialAvailableOutgoingBitrate: 1000000
        },
    },

    fileTransfer: {
        maxRetries: 5
    }
};