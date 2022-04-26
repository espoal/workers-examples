import { parentPort, receiveMessageOnPort } from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'
import { ReadableStream } from 'node:stream/web'

const {message: queuePort} = receiveMessageOnPort(parentPort)




const request = (req) =>
  new Promise((res, rej) => {
    queuePort.postMessage(req)
    queuePort.on('message', res)
    queuePort.on('messageerror', rej)
  })

const queueStream = new ReadableStream({
  start(controller) {
  },

  async pull(controller) {
    const resp = await request({
      type: 'workChunk',
    })
    if (resp === undefined) controller.close()
    else controller.enqueue(resp)
  },

  cancel(reason) {
    queuePort.close()
  },
})


let iters = 0

for await (const chunk of queueStream) {
  iters++
  console.log({ iters, chunk })
  await setTimeout(100)
}

console.log('Worker Done!')

console.log({ queueStream })

queueStream.cancel('')

queuePort.close()
