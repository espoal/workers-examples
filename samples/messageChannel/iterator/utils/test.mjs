import { setTimeout } from 'node:timers/promises'

const consumer = {
  counter: 0,
  doner: false,
  starterd: false,
  starter () {
    this.starterd = true
  },
  puller () {
    this.counter++
  },
  ender () {
    this.doner = true
  },
  async* [Symbol.asyncIterator]() {
    while (true) {
      yield this.counter
      if (this.counter > 4) return
    }
  }
}
console.log('Start')

await consumer.starter()

for await (const chunk of consumer) {
  console.log({ chunk })
  await consumer.puller()
}

await consumer.ender()

console.log('Done')

console.log({ consumer })
