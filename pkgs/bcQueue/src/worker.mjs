import { BroadcastChannel, parentPort, receiveMessageOnPort } from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'

const queue = new BroadcastChannel('queue')


//const first = receiveMessageOnPort(queue)
// console.log({ first })



parentPort.postMessage('ready')

let count = 0
while (true) {
  const resp = receiveMessageOnPort(queue)
  const parent = receiveMessageOnPort(parentPort)

  console.log({resp, parent, count})

  count++
  await setTimeout(200)
}
