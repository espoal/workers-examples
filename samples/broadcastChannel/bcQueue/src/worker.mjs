import { BroadcastChannel, parentPort, receiveMessageOnPort } from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'

const queue = new BroadcastChannel('queue')

parentPort.postMessage('ready')

let count = 0
while (true) {
  const resp = receiveMessageOnPort(queue)

  console.log({resp, count})

  count++
  await setTimeout(200)
}
