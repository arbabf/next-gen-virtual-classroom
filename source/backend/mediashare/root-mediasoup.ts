/**
 * Screen container; contains and controls a Panel (the screen) and the buttons (and other Panels) that interact with it.
 * Author: Arbab Ahmed, Group 15 [Project 5]
 * Last modified: 08/09/2022
 */

const mediasoup = require("mediasoup");
const worker = await mediasoup.createWorker(
    {
      logLevel            : "debug",
      dtlsCertificateFile : "/home/foo/dtls-cert.pem",
      dtlsPrivateKeyFile  : "/home/foo/dtls-key.pem"
    });
const mediaCodecs =
[
  {
    kind        : "audio",
    mimeType    : "audio/opus",
    clockRate   : 48000,
    channels    : 2
  },
  {
    kind       : "video",
    mimeType   : "video/H264",
    clockRate  : 90000,
    parameters :
    {
      "packetization-mode"      : 1,
      "profile-level-id"        : "42e01f",
      "level-asymmetry-allowed" : 1
    }
  }
];



const router = await worker.createRouter({ mediaCodecs });

const webRtcServer = await worker.createWebRtcServer(
    {
      listenInfos :
      [
        {
          protocol : 'udp',
          ip       : '9.9.9.9',
          port     : 20000
        },
        {
          protocol : 'tcp',
          ip       : '9.9.9.9',
          port     : 20000
        }
      ]
    });

const transport = await router.createWebRtcTransport(
    {
      webRtcServer : webRtcServer,
      listenIps    : [ { ip: "192.168.0.111", announcedIp: "88.12.10.41" } ],
      enableUdp    : true,
      enableTcp    : true,
      preferUdp    : true
    });

export default router;