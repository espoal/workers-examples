import { parentPort, receiveMessageOnPort } from 'worker_threads'
import { EventEmitter } from 'node:events'

const map = new Map()

const emitter = new EventEmitter()

const { message: workerPorts } = receiveMessageOnPort(parentPort)

let closedPorts = 0

const msgHandler = (port, map) => {
  return (msg) => {
    const { type, key, value } = msg.data
    switch (type) {
      case 'get': {
        const mapValue = map.get(key)
        // TODO: Switch case
        if (mapValue === undefined) {
          map.set(key, 'pending')
          port.postMessage({cached: false})
        } else if (mapValue === 'pending') {
          emitter.once(key, mapValue => {
            console.log({ emitterValue: mapValue})
            port.postMessage({cached: true, mapValue})
          })
        } else {
          port.postMessage({cached: true, mapValue})
        }
        break
      }
      case 'set': {
        map.set(key, value)
        emitter.emit(key, value)
        port.postMessage('ok!')
        break
      }
    }
  }
}

for (const port of workerPorts) {
  port.onmessage = msgHandler(port, map)
  port.on('close', () => {
    if (++closedPorts === workerPorts.length) {

      //for (const [key, value] of map)
      //  console.log({ key, value})

      console.log('Shared Map done!')
    }

  })
}
