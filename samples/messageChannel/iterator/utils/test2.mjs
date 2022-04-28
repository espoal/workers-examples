import { setTimeout } from 'node:timers/promises'

class Consumer {
  counter = 0

  constructor () {}

  start () {}

  pull () {}

  end () {}

  async* [Symbol.asyncIterator]() {
    while (true) {
      await setTimeout(100)
      yield this.counter++
      if (this.counter > 4) return
    }
  }
}
console.log('Start')

const consumer = new Consumer()

await consumer.start()

for await (const chunk of consumer) {
  console.log({ chunk })
  await consumer.pull()
}

await consumer.end()

console.log('Done')

console.log({ consumer })
