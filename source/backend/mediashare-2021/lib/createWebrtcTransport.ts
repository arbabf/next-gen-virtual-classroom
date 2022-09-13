import { Router } from 'mediasoup/lib/types';
import { config } from '../config';

const createWebRtcTransport = async (mediasoupRouter: Router, clientId: string, isProducer: boolean) => {
    const {
        maxIncomeBitrate,
        initialAvailableOutgoingBitrate,
    } = config.mediasoup.webRtcTransport;

    const transport = await mediasoupRouter.createWebRtcTransport({
        listenIps: config.mediasoup.webRtcTransport.listenIps,
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
        initialAvailableOutgoingBitrate,
        appData: {clientId}
    })

    if (maxIncomeBitrate) {
        try {
            await transport.setMaxIncomingBitrate(maxIncomeBitrate);
        } catch (error) {
            console.error(error);
        }
    }

    return {
        transport,
        isProducer,
        params: {
            id: transport.id,
            iceParameters: transport.iceParameters,
            iceCandidates: transport.iceCandidates,
            dtlsParameters: transport.dtlsParameters
        },
    }
}

export {createWebRtcTransport};