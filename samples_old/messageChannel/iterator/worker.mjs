import {
  threadId
} from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'
import { QueueConsumer } from './src/QueueConsumer.mjs'

console.log(`Worker ${threadId} start!`)

// Create consumer
const consumer = new QueueConsumer({})
await consumer.start()

// Consumer cycle
for await (const task of consumer) {
  console.log({ threadId, task })
  await setTimeout(200)
}

console.log(`Worker ${threadId} done!`)

// Signal end
await consumer.close()
