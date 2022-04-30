let iter = 0

const request = async (port) => {
  iter++
  console.log({ iter })
  if (iter > 12) debugger
  // TODO: memory leak
  return new Promise((res, rej) => {
    port.postMessage('')
    port.onmessage = msg => res(msg)
  })
}

export class QueueReader {

  queuePort = null


  constructor (port) {
    this.queuePort = port
  }

  start(controller) {
    console.log('[reader start]')
  }

  async pull(controller) {
    // TODO: memory leak
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
