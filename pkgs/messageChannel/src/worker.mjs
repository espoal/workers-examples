import { parentPort, receiveMessageOnPort } from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'


const awaitPort = () =>
  new Promise(res => {
    parentPort.on('message', res)
  })
const port = await awaitPort()


let iter = 0



while ( iter <10) {

  port.postMessage(iter)
  const message = receiveMessageOnPort(port)

  console.log({ iter, message})
  iter++
  await setTimeout(50)
}





