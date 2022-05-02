import { parentPort, receiveMessageOnPort } from 'node:worker_threads'
import { receiveMessageOnPortAsync } from './receiveAsync.mjs'

export class SharedMapConsumer {

  sharedMapPort = null
  constructor () {
    const { message } = receiveMessageOnPort(parentPort)
    this.sharedMapPort = message
  }

  async get(key) {
    this.sharedMapPort.postMessage({ type: 'get', key})
    const { data } = await receiveMessageOnPortAsync(this.sharedMapPort)
    return data
  }

  async set(key, value) {
    this.sharedMapPort.postMessage({ type: 'set', key, value})
    const { data } = await receiveMessageOnPortAsync(this.sharedMapPort)
    return data
  }

  async close() {
    this.sharedMapPort.close()
  }

}
