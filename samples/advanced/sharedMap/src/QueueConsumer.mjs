import { parentPort, receiveMessageOnPort, threadId } from 'worker_threads'
import { receiveMessageOnPortAsync } from './receiveAsync.mjs'

export class QueueConsumer {

  schedulerPort = null
  concurrency = 1

  constructor({ concurrency }) {
    this.concurrency = concurrency
  }

  async close(sharedMap) {
    console.log(`Worker ${threadId} done!`)
    this.schedulerPort.postMessage({
      done: true
    })
    sharedMap.close()
  }

  async start() {
    const { message } = receiveMessageOnPort(parentPort)
    this.schedulerPort = message
  }


  [Symbol.asyncIterator]() {

    //console.log('[QueueConsumer] Start')

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


