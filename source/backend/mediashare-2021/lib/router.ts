import { Worker, Router, InvalidStateError, WorkerLogLevel } from "mediasoup/node/lib/types";
import { config } from "../config";
import { generateByTime } from "./numGenerator";
import * as mediasoup from 'mediasoup';
import { roomManager } from "./room";

// one worker per cpu core. 1:1
// one router per room. 1:1
// one worker can has many routers. 1:n

const maxRouters = config.mediasoup.maxRouterPerWorker * config.mediasoup.maxWorkers;

/**
 * worker: the worker.
 * routerCnt: number of router inside this worker.
 */
type WorkerObject = { worker: Worker, routerCnt: 0, /* id: number */ }

/**
 * worker: the worker it belongs to.
 * router: the router.
 */
type RouterObject = { workerObject: WorkerObject, router: Router, id: string }

const workerObjects: Array<WorkerObject> = [];
const getWorkerObjects = (): ReadonlyArray<WorkerObject> => workerObjects
const getWorkers = (): ReadonlyArray<Worker> => workerObjects.map(wObj => wObj.worker)

const routerObjects: Array<RouterObject> = [];
const getRouterObjects = (): ReadonlyArray<RouterObject> => routerObjects
const getRouters = (): ReadonlyArray<Router> => routerObjects.map(rObj => rObj.router)
const findRouterObjectById = (id: string): RouterObject => routerObjects.filter(ro => ro.id == id)[0]   // can be optimized

let lastRouterObject: RouterObject|null = null


const createRouter = async () => {
    const workerObject: WorkerObject = await getCurrentWorkerObject()

    if (config.debug) console.log("[createRouter] Start to create router");

    const mediaCodecs = config.mediasoup.router.mediaCodes;
    const router = await workerObject.worker.createRouter({ mediaCodecs })

    if (config.debug) console.log("[createRouter] Router created")

    const routerId = generateByTime()
    const routerObject: RouterObject = { workerObject: workerObject, router: router, id: router.id }
    routerObjects.push(routerObject)
    roomManager.addNewRoom(routerId.toString(), routerObject)
    if (config.debug) console.log("[createRouter] Room created")
    

    lastRouterObject = routerObject

    router.on('workerclose', () => {
        // clear memory
        routerObject.workerObject.routerCnt -= 1

        if (routerObject.workerObject.routerCnt <= 0) {
            routerObject.workerObject.worker.close()
        }

        const idx = routerObjects.indexOf(routerObject, 0)
        routerObjects.splice(idx, 1)
    })

    return routerId
}

const createWorker = async () => {
    if (config.debug) console.log("[createWorker] Creating a worker instance");

    const worker: Worker = await mediasoup.createWorker({
        logLevel: config.mediasoup.worker.logLevel as WorkerLogLevel,
        logTags: config.mediasoup.worker.logTags,
        rtcMinPort: config.mediasoup.worker.rtcMinPort,
        rtcMaxPort: config.mediasoup.worker.rtcMaxPort
    });

    if (config.debug) console.log("[createWorker] Created a worker instance");
    
    const workerObject: WorkerObject = { worker: worker, routerCnt: 0 }
    workerObjects.push(workerObject)

    worker.observer.on("close", () => {
        // clear memory
        const idx = workerObjects.indexOf(workerObject, 0)
        workerObjects.splice(idx, 1)
    });

    worker.observer.on("newrouter", (router) => {
        workerObject.routerCnt += 1
    });

    worker.on('died', () => {
        console.error(`[pid:${worker.pid}] mediasoup worker died, exiting in 2 seconds...`);
        setTimeout(() => {
            // close
            worker.close()
        }, 2000);
    });
    return workerObject
}

const getCurrentWorkerObject = async () => {
    if (config.debug) console.log("[getCurrentWorkerObject] Num of existed routers: " 
        + getNumOfRouters());
    
    if (getNumOfRouters() >= maxRouters) {
        throw new InvalidStateError("No router slot is available")
    }

    if(lastRouterObject === null) {
        // initial state, create first worker.
        if (config.debug) console.log("[getCurrentWorkerObject] Create a new worker from null");
        
        return createWorker()
    } else if (lastRouterObject.workerObject.routerCnt == config.mediasoup.maxRouterPerWorker) {
        // number of worker is reached the maximum, but some still have slots for a new router.
        if (workerObjects.length >= config.mediasoup.maxWorkers) {
            if (config.debug) console.log("[getCurrentWorkerObject] Use an available worker");
            return workerObjects.reduce((acc, crt) => crt.routerCnt == config.mediasoup.maxRouterPerWorker? acc : crt)
        } else {
            // we have space to create a new worker.
            if (config.debug) console.log("[getCurrentWorkerObject] Have space to create a new worker");
            return createWorker()
        }
    } else {
        // has enough slots in current worker.
        if (config.debug) console.log("[getCurrentWorkerObject] Reuse previous worker");
        return lastRouterObject.workerObject
    }
}

const getNumOfRouters = (): number => {
    return workerObjects.reduce((acc, crt) => acc + crt.routerCnt, 0)
}

export {RouterObject, createRouter, findRouterObjectById}