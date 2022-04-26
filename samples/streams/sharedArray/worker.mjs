import { parentPort, receiveMessageOnPort } from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'
import { ReadableStream } from 'node:stream/web'



const request = (req) =>
  new Promise((res, rej) => {
    parentPort.postMessage(req)
    parentPort.on('message', msg => res(msg))
    parentPort.on('messageerror', err => rej(err))
  })

const sab = receiveMessageOnPort(parentPort)

console.log({ sab })

const readableStream = new ReadableStream({
  start(controller) {
    /* … */
  },

  pull(controller) {
    /* … */
  },

  cancel(reason) {
    /* … */
  },
})
