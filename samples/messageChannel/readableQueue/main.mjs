import { workersFactory } from './factory.mjs'

const workChunks = [...Array(8).keys()]
const handler = () => workChunks.shift()


const [workersPromise, workerPorts, workers] = workersFactory({
  fileName: './worker.mjs',
  workerData: {},
  handler,
  concurrency: 2
})


await workersPromise

console.log('Done!')
