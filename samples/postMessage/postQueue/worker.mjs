import { parentPort, receiveMessageOnPort } from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'


const request = (req) =>
  new Promise(res => {
    parentPort.postMessage(req)
    parentPort.on('message', msg => res(msg))
  })


let iters = 0

while (true) {
  iters++
  console.log({ iters })
  const resp = await request({
    type: 'workChunk',
  })
  console.log({ resp })
  if (resp === undefined) break
  await setTimeout(100)
}

parentPort.close()
