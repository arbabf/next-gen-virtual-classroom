import { RtpCodecCapability } from 'mediasoup/node/lib/RtpParameters';
import { TransportListenIp } from 'mediasoup/node/lib/Transport';
import { WorkerLogTag } from 'mediasoup/node/lib/Worker';
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
                    mimeType: 'video/VP8',
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
                    announcedIp: '127.0.0.1' // replace with public IP address
                                            // before it was 10.0.2.15, a virtualbox-only IP and it's noted here because i spent 7 days on this... amazing.
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