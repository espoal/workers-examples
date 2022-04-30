
// Cooperative scheduler
export const schedulerFactory = async ({ workersPool }) => {
  // Receive ports
  const { workersPorts } = workersPool
  let openPorts = workersPorts.length
  let closedPorts = 0

  const schedulerReader = new ReadableStream({
    start(controller) {
      for (const port of workersPorts) {
        port.onmessage = ({ data }) => {
          const { value, done } = data
          if (done) {
            closedPorts++
            port.close()
            if (closedPorts === openPorts) controller.close()
            // remove port from pool
            // if last port, close the stream
          }
          else controller.enqueue({ port, value })
        }
        port.onmessageerror = err => console.log({ err })
      }
    }
  })

  // Return Consumer readable
  // Return Consumer writable

  return schedulerReader
}
