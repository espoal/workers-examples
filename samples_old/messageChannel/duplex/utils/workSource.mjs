import { setTimeout } from 'node:timers/promises'

// Readable
class WorkSourceStream {
  counter = 0
  delay = 10
  maxIters = 10
  constructor ({delay, maxIters}) {
    this.delay = delay
    this.maxIters = maxIters
  }

  start(controller) {}

  async pull(controller) {
    await setTimeout(this.delay)
    if (this.counter > this.maxIters) controller.close()
    else controller.enqueue(this.counter++)
  }

  cancel(reason) {}
}

export const sourceFactory = async ({delay = 10, maxIters = 10}) => {
  const workSource = new WorkSourceStream({delay, maxIters})
  const readable = new ReadableStream(workSource)
  const reader = await readable.getReader()
  return {readable, reader}
}
