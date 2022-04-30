import { Worker } from 'node:worker_threads'
import { promiseFactory } from '@libs/utils'
import { workersFactory } from './factory.mjs'

const workChunks = [...Array(16).keys()]


const [workersPromise, workers] = workersFactory({
  fileName: './worker.mjs',
  workerData: {},
  concurrency: 2
})

for (const worker of workers) {
  worker.on('message', msg => {
    //console.log({ msg })
    const chunk = workChunks.shift()
    worker.postMessage(chunk)
  })
}



await workersPromise

console.log('Done!')
