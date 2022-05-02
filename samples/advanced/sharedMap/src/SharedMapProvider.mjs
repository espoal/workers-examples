import { parentPort, receiveMessageOnPort } from 'worker_threads'
import { receiveMessageOnPortAsync } from './receiveAsync.mjs'

export class SharedMapProvider {

  workerPorts = []

  constructor() {
  }

  async close() {
    this.workerPorts.postMessage({
      done: true
    })
  }

  async start() {
    const { message } = receiveMessageOnPort(parentPort)
    this.workerPorts = message
  }


  [Symbol.asyncIterator]() {

    console.log('[QueueConsumer] Start')

    return {
      next: async () => {
        this.schedulerPort.postMessage({
          value: 'next',
          done: false
        })
        const { data } = await receiveMessageOnPortAsync(this.schedulerPort)
        const { value, done } = data

        if (done) return { done }
        else return { value, done }
      }
    }
  }
}
