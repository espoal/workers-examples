import { setTimeout } from 'node:timers/promises'

export class QueueWriter {

  queue = []
  workersPorts = []

  constructor (ports) {
    this.workersPorts = ports
  }

  start(controller) {
    console.log('[writer start]')
    // console.log({ controller })
    for (const port of this.workersPorts) {
      port.onmessage = async (msg) => {
        // console.log({ workerMsg: msg})
        while (this.queue.length === 0 )
          await setTimeout(100)
        port.postMessage(this.queue.shift())
      }
    }

  }

  write(chunk, controller) {
    // console.log({ writeChunk: chunk })
    this.queue.push(chunk)
  }

  close(controller) {
    console.log('[writer close]')
    for (const port of this.workersPorts)
      port.close()
  }

  abort(reason) {
    console.log('[writer abort] reason: ' + reason)
    for (const port of this.workersPorts)
      port.close()
  }

}
