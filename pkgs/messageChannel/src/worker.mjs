import { parentPort, receiveMessageOnPort } from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'

const {message: port} = receiveMessageOnPort(parentPort)


let iter = 0
while ( iter <10) {

  port.postMessage(iter)
  const {message} = receiveMessageOnPort(port) ?? {}

  console.log({ iter, message})
  iter++
  await setTimeout(50)
}





