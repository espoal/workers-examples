import {
  threadId
} from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'
import { consumerFactory } from './queue/consumer.mjs'

console.log(`Worker ${threadId} start!`)

// Start consumer
const { workerSchedulerReader, pull, end } = await consumerFactory({})

// Consumer cycle
for await (const workUnit of workerSchedulerReader) {
  console.log({ threadId, workUnit })
  await setTimeout(200)
  await pull()
}

console.log(`Worker ${threadId} done!`)

// Signal end
await end()
