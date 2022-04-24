import { parentPort, receiveMessageOnPort } from 'node:worker_threads'


const request = (req) =>
  new Promise(res => {
    parentPort.postMessage(req)
    parentPort.on('message', msg => res(msg))

  })


const resp = await request('Hello ')

console.log({ resp })

parentPort.close()
