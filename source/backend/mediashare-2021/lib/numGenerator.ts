// TODO: can be optimized
const generateByTime = (range:number = 1e9):number => new Date().getTime() % range     // timestamp % billion   (11.57 days)

export {generateByTime}