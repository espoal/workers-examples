import { Worker } from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'


const worker = new Worker('./worker.mjs')

worker.on('message', async (msg) => {

  await setTimeout(100)
  worker.postMessage(msg + 'world')
})
