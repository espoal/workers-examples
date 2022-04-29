import { setTimeout } from 'node:timers/promises'

export class QueueScheduler {
  done = false
  started = false
  workerPool = []
  workerPorts = []
  requestQueue = []
  data = [...Array(10).keys()]

  constructor({ workerPool }) {
    this.workerPool = workerPool
  }

  async start() {
    for (const worker of this.workerPool) {
      const {port1, port2} = new MessageChannel();
      worker.postMessage(port2, [port2])
      port1.onmessage = ({data}) => {
        this.requestQueue.push(port1)
      }
      this.workerPorts.push(port1)
    }
  }

  async close() {
    this.data = null;
    console.log('Closing!')
  }


  [Symbol.asyncIterator]() {
    // Use a new index for each iterator. This makes multiple
    // iterations over the iterable safe for non-trivial cases,
    // such as use of break or nested looping over the same iterable.
    let index = 0;

    for (const worker of this.workerPool) {
      const {port1, port2} = new MessageChannel();
      worker.postMessage(port2, [port2])
      port1.onmessage = ({data}) => {
        this.requestQueue.push(port1)
      }
      this.workerPorts.push(port1)
    }

    console.log('[Symbol.asyncIterator]');

    return {
      next: async () => {
        await setTimeout(100)
        if (!this.done) {
          return {value: this.data[index++], done: false}
        } else {
          return {done: true}
        }
      }
    }
  }
}


