import { parentPort, receiveMessageOnPort } from 'worker_threads'
import { receiveMessageOnPortAsync } from './receiveAsync.mjs'
export class QueueConsumer {

  schedulerPort = null

  constructor() {
  }

  async close() {
    this.schedulerPort.postMessage({
      done: true
    })
  }

  async start() {
    const { message } = receiveMessageOnPort(parentPort)
    this.schedulerPort = message
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


