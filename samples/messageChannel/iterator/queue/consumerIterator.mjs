import { parentPort, receiveMessageOnPort, threadId } from 'node:worker_threads'
import { receiveMessageOnPortAsync } from '../utils/receiveAsync.mjs'

export class ConsumerIterator {
  schedulerPort = null
  started = false
  done = false

  constructor () {}

  async starter () {
    const { data: schedulerPort } = await receiveMessageOnPortAsync(parentPort)
    this.schedulerPort = schedulerPort
    this.schedulerPort.postMessage({done: false, value: 'start'})
    this.started = true
  }

  async puller () {
    this.schedulerPort.postMessage({ done: false })
  }

  async ender () {
    this.schedulerPort.postMessage({ done: true })
    this.done = true
  }

  async* [Symbol.asyncIterator]() {
    const { value, done } = await receiveMessageOnPortAsync(this.schedulerPort)
    if (done) return
    else yield value
  }
}

export const consumerIteratorFactory = async ({}) => {
  // Receive port
  const { message: schedulerPort } = receiveMessageOnPort(parentPort)

  const start = async () => {

  }

  const pull = async () => {
    schedulerPort.postMessage({ done: false })
  }

  const end = async () => {
    schedulerPort.postMessage({ done: true })
  }

  // Send start signal
  schedulerPort.postMessage({done: false, value: 'start'})

  // TODO: merge in one readable / writable object
  return {
    async* [Symbol.asyncIterator]() {
      const { value, done } = await receiveMessageOnPortAsync({schedulerPort})
      if (done) return
      else yield value
    },
    pull,
    end
  }
}

