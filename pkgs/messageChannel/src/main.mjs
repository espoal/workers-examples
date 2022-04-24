import { Worker, MessageChannel } from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'

const {port1, port2} = new MessageChannel()



const worker1 = new Worker('./worker.mjs')
const worker2 = new Worker('./worker.mjs')

/*
worker1.postMessage(port1, [port1])
worker2.postMessage(port2, [port2])


 */

worker1.on('online', ()=> {
  worker1.postMessage(port1, [port1])
})

worker2.on('online', ()=> {
  worker2.postMessage(port2, [port2])
})




console.log('Done!')



