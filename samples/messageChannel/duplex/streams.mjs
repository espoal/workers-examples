

export class WorkerRequestsStream {
  ports = []
  disabledPorts = 0
  constructor (ports) {
    this.ports = ports
  }
  start(controller) {
    console.log('[WorkerRequestsStream start]')
    for (const port of this.ports) {
      port.onmessage = msg => {
        if (msg.data.done) {
          port.close()
          this.disablePort(controller)
        }
        else controller.enqueue(msg)
      }
      port.onmessageerror = err => console.log({ err })
    }
  }
  disablePort(controller) {
    this.disabledPorts++
    if (this.disabledPorts === this.ports.length) {
      controller.close()
      this.cancel('done')
    }


  }
  cancel(reason) {
    console.log('canceling: ' + reason)
    /*for (const port of this.ports) {
      await port.close()
    }*/
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
