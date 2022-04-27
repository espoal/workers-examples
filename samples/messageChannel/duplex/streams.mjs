

export class WorkerRequestsStream {
  ports = []
  constructor (ports) {
    this.ports = ports
  }
  start(controller) {
    console.log('[WorkerRequestsStream start]')
    for (const port of this.ports) {
      port.onmessage = msg => controller.enqueue(msg)
      port.onmessageerror = err => console.log({ err })
    }
  }
  async cancel(reason) {
    for (const port of this.ports) {
      await port.close()
    }
  }
}

export class WorkerResponseStream {
  ports = []
  constructor (ports) {
    this.ports = ports
  }
  start(controller) {
    console.log('[Main WorkerRequestsStream start]')

  }
  async write(chunk, controller) {
    // console.log('[Main WorkerRequestsStream write]')
    // TODO: Route to correct port
    const { workerPort, value, done } = chunk
    let currentPort = this.ports[workerPort-1]

    currentPort.postMessage({value, done})

    // const { port, data} = chunk
  }

  close(controller) {
    console.log('[writer close]')
    for (const port of this.ports)
      port.close()
  }

  abort(reason) {
    //console.log('[writer abort] reason: ' + reason)
    for (const port of this.ports)
      port.close()
  }

}
