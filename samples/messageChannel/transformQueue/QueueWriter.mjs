import { setTimeout } from 'node:timers/promises'

export class QueueWriter {

  queue = []
  workersPorts = []
  readable = null
  writable = null
  writer = null
  reader = null

  constructor (ports) {
    this.workersPorts = ports
    const { writable, readable } = new TransformStream()
    this.readable = readable
    this.writable = writable
  }

  async start(controller) {
    console.log('[writer start]')
    this.writer = await this.writable.getWriter()
    this.reader = await this.readable.getReader()
    // console.log({ controller })
    for (const port of this.workersPorts) {
      port.onmessage = async (msg) => {
        // console.log({ workerMsg: msg})
        const chunk = await this.reader.read()

        port.postMessage(chunk)
      }
    }

  }

  write(chunk, controller) {
    // console.log({ writeChunk: chunk })
    this.writer.write(chunk)
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
