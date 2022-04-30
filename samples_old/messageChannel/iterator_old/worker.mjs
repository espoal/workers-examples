import {
  threadId
} from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'
import { ConsumerIterator } from './queue/consumerIterator.mjs'

console.log(`Worker ${threadId} start!`)

// Start consumer
const schedulerStream = new ConsumerIterator()
await schedulerStream.starter()

// Consumer cycle
for await (const task of schedulerStream) {
  console.log({ threadId, task })
  await setTimeout(200)
  await schedulerStream.puller()
}

console.log(`Worker ${threadId} done!`)

// Signal end
await schedulerStream.ender()
