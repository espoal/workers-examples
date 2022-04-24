import { Worker, BroadcastChannel, receiveMessageOnPort } from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'

const queue = new BroadcastChannel('queue')



const worker = new Worker('./worker.mjs')

worker.on('online', () => {

  queue.postMessage('Hello 1')

})

worker.on('message', () => {

  queue.postMessage('Hello 2')
  worker.postMessage('ok')

})

queue.postMessage('Hello')

await setTimeout(200)

queue.postMessage('Hello 3')

await setTimeout(500)

queue.postMessage('Hello 4')







