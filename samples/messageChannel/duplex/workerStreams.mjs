export class WorkSourceStream {
  port = null
  constructor (port) {
    this.port = port
  }
  start(controller) {
    console.log('[WorkSourceStream start]')
    debugger
    this.port.onmessage = (wmsg) => {
      debugger
      const { data } = wmsg
      console.log({ data })
      const { value, done } = data
      console.log({ value, done })


      if (done) {
        controller.close()
        this.port.close()
      }
      else controller.enqueue({value, done})

    }
    this.port.onmessageerror = err => console.log({err})
  }
  async cancel(reason) {
    await this.port.close()
  }
}

export class WorkRequestStream {
  port = null
  constructor (port) {
    this.port = port
  }
  start(controller) {
    console.log('[Worker WorkerRequestsStream start]')

  }

  async write(chunk, controller) {
    this.port.postMessage(chunk)
  }

  close(controller) {
    //console.log('[writer close]')

  }

  abort(reason) {
    //console.log('[writer abort] reason: ' + reason)

  }
}
