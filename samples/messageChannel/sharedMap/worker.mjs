import {
  threadId
} from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'
import { QueueConsumer } from './src/QueueConsumer.mjs'
import { SharedMapConsumer } from './src/SharedMap.mjs'

console.log(`Worker ${threadId} start!`)

// Create consumer
const consumer = new QueueConsumer({})
await consumer.start()

// Start Shared Map
const sharedMap = new SharedMapConsumer()

// Consumer cycle
for await (const task of consumer) {
  const cacheMiss = await sharedMap.get(task)
  await sharedMap.set(task, Math.random())
  const cache = await sharedMap.get(task)
  console.log({ threadId, task, cache, cacheMiss })
  await setTimeout(200)
}

console.log(`Worker ${threadId} done!`)

// Signal end
await consumer.close()
