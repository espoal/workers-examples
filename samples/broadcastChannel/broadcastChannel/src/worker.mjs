import { BroadcastChannel, parentPort, receiveMessageOnPort } from 'node:worker_threads'

const queue = new BroadcastChannel('queue')

queue.onmessage = ev => {
  const { data } = ev
  console.log({ ev, data })
}

parentPort.postMessage('Ready')


