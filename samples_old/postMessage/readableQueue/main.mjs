import { workersFactory } from './factory.mjs'
import { queueFactory } from './queue.mjs'

const workChunks = [...Array(8).keys()]


const handler = () => workChunks.shift()




const [workersPromise, workers] = workersFactory({
  fileName: './worker.mjs',
  workerData: {},
  handler,
  concurrency: 2
})

queueFactory({ workers, handler})


await workersPromise

console.log('Done!')
