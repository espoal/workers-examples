const request = async (port) =>
  new Promise((res, rej) => {
    port.postMessage('')
    port.on('message', res)
    port.on('messageerror', rej)
  })

export class QueueReader {

  queuePort = null


  constructor (port) {
    this.queuePort = port
  }

  start(controller) {
    console.log('[reader start]')
  }

  async pull(controller) {
    const resp = await request(this.queuePort)
    // console.log({ resp})
    if (resp !== undefined) controller.enqueue(resp)
    else controller.close()
  }


  cancel(reason) {
    console.log('[reader close]')
    this.queuePort.close()
  }

}
