import { Worker, BroadcastChannel } from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'

const queue = new BroadcastChannel('queue')



const worker = new Worker('./worker.mjs')

worker.on('message', msg => {

  console.log({msg})
  queue.postMessage('Hello 2')


})

queue.postMessage('Hello')

await setTimeout(75)

queue.postMessage('Hello 1')




