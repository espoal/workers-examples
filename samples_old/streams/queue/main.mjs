import { Worker } from 'node:worker_threads'
import { promiseFactory } from '@libs/utils'
import { workersFactory } from './factory.mjs'
import { TransformStream } from 'node:stream/web'


const workChunks = [...Array(8).keys()]

const workerStream = new ReadableStream({
  start(controller) {

  },

  pull(controller) {
    controller.enqueue(workChunks.shift())
  },

  cancel(reason) {

  },
})

class queueSource {
  queueReader = undefined
  source = undefined
  constructor (source) {
    this.source = source
  }

  start = async (controller) => {
  this.queueReader = await this.source.getReader()
  }

  pull = async (controller) => {
    const { value, done} = await this.queueReader.read()
    if (done) controller.close()
    else controller.enqueue(value)
  }

  cancel(reason) {
  this.queueReader.cancel()
}
}

const queueStream = new ReadableStream(new queueSource(workerStream))




const [workersPromise, workers] = workersFactory({
  fileName: './streamWorker.mjs',
  workerData: {},
  queueStream,
  concurrency: 2
})

/*
const queueReader = await queueStream.getReader()

for (const worker of workers) {
  worker.on('message', async (msg) => {
    //console.log({ msg })
    const {value} = await queueReader.read()
    worker.postMessage(value)
  })
}

*/

await workersPromise

console.log('Done!')
