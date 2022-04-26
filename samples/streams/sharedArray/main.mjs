import { Worker } from 'node:worker_threads'
import { workersFactory } from './factory.mjs'
import { TransformStream } from 'node:stream/web'


const workChunks = [...Array(8).keys()]

const sab = new SharedArrayBuffer(1024)

const writableStream = new WritableStream({
  async start(controller) {
    /* … */
  },

  async write(chunk, controller) {

  },

  async close() {
    /* … */
  },
  async abort(reason) {
    /* */
  }
})


const [workersPromise, workers] = workersFactory({
  fileName: './worker.mjs',
  workerData: { },
  sab,
  concurrency: 2
})

await workersPromise

console.log('Done!')
