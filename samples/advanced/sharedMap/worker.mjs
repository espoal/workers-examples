import {
  threadId
} from 'node:worker_threads'
import { EventEmitter } from 'node:events'
import { setTimeout } from 'node:timers/promises'
import { QueueConsumer } from './src/QueueConsumer.mjs'
import { SharedMapConsumer } from './src/SharedMapConsumer.mjs'

console.log(`Worker ${threadId} start!`)

// Create consumer
const consumer = new QueueConsumer({ concurrency: 3 })
await consumer.start()

// Connect to shared worker
const sharedMap = new SharedMapConsumer()

const emitter = new EventEmitter({ reportOnUncaughtException: true })

const { next } = consumer[Symbol.asyncIterator]()

emitter.on('start', async ({value, done}) => {
  console.log({ value, done, threadId })
  await sharedMap.set(value, threadId)
  await setTimeout(200)
  if (done) await consumer.close(sharedMap)
  else emitter.emit('start', await next())
})

emitter.emit('start', await next())
emitter.emit('start', await next())
emitter.emit('start', await next())
emitter.emit('start', await next())
emitter.emit('start', await next())
emitter.emit('start', await next())



//console.log(`Worker ${threadId} done!`)

// Signal end
//await consumer.close()
