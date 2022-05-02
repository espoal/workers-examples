import { Worker } from 'node:worker_threads'

export const sharedWorkerFactory = async ({ fileName, workersPool }) => {
  // Receive ports
  const workersPorts = []
  const openPorts = workersPool.length
  let closedPorts = 0

  for (const worker of workersPool) {
    const {port1, port2} = new MessageChannel()
    worker.postMessage(port2, [port2])
    workersPorts.push(port1)
  }

  const sharedWorker = new Worker(fileName)

  sharedWorker.postMessage(workersPorts, workersPorts)




  const schedulerReader = new ReadableStream({
    start(controller) {
      for (const port of workersPorts) {
        port.onmessage = ({ data }) => {
          // TODO: specific end signal
          const { value, done } = data
          if (done) {
            closedPorts++
            port.close()
            if (closedPorts === openPorts) controller.close()
            // remove port from pool
            // if last port, close the stream
          }
          else controller.enqueue(new TaskRequest(port))
        }
        port.onmessageerror = err => console.log({ err })
      }
    }
  })

  // Return Consumer readable
  // Return Consumer writable

}
