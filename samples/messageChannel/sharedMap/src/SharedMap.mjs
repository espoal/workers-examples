import { receiveMessageOnPort, parentPort } from 'node:worker_threads'
import { receiveMessageOnPortAsync } from './receiveAsync.mjs'

let cacheMisses = 0

const msgHandler = (port, map) => {
  return (msg) => {
    const { type, key, value } = msg.data
    switch (type) {
      case 'get': {
        const mapValue = map.get(key)
        if (mapValue === undefined) {
          map.set(key, 'pending')
          port.postMessage({cached: false})
        } else if (mapValue === 'pending') {
          cacheMisses++
          port.postMessage({cached: false})
        } else {
          port.postMessage({cached: true, mapValue})
        }
        break
      }
      case 'set': {
        map.set(key, value)
        port.postMessage('ok!')
        break
      }
    }
  }
}

export class SharedMap {
  map = null
  workerPorts = []

  constructor (workersPool) {
    this.map = new Map()
    for (const worker of workersPool) {
      const {port1, port2} = new MessageChannel()
      worker.postMessage(port2, [port2])
      this.workerPorts.push(port1)
      port1.onmessage = msgHandler(port1, this.map)
    }
  }

  async close () {
    console.log({ cacheMisses })
    for (const port of this.workerPorts)
      port.close()
  }
}

export class SharedMapConsumer {
  sharedMapPort = null
  constructor () {
    const {message} = receiveMessageOnPort(parentPort)
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

}
