import { setTimeout } from 'node:timers/promises'

export class WorkSourceStream {
  counter = 0
  time = 10
  maxIters = 10
  constructor (time = 10, maxIters = 10) {
    this.time = time
    this.maxIters = maxIters
  }

  start(controller) {}

  async pull(controller) {
    await setTimeout(this.time)
    if (this.counter > this.maxIters) controller.close()
    else controller.enqueue(this.counter++)
  }

  cancel(reason) {}
}
