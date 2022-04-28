import { parentPort, receiveMessageOnPort, threadId } from 'node:worker_threads'

export const consumerFactory = async ({}) => {
  // Receive port
  const { message: schedulerPort } = receiveMessageOnPort(parentPort)

  const workerSchedulerReader = new ReadableStream({
    start(controller) {
      schedulerPort.onmessage = ({ data }) => {
        const { value, done } = data
        if (done) controller.close()
        else controller.enqueue(value)
      }
    }
  })

  // TODO: Switch to decorated iterator

  const pull = async () => {
    schedulerPort.postMessage({ done: false })
  }

  const end = async () => {
    schedulerPort.postMessage({ done: true })
  }

  // Send start signal
  schedulerPort.postMessage({done: false, value: 'start'})

  // TODO: merge in one readable / writable object
  return { workerSchedulerReader, pull, end }
}
