import { workersFactory } from './src/factory.mjs'
import { schedulerFactory } from './src/QueueScheduler.mjs'
import { sharedWorkerFactory } from './src/sharedWorkerFactory.mjs'
import { workSource } from './src/workSource.mjs'

console.log('Main start!')

// Create Workers
const workersPool = workersFactory({
  fileName: './worker.mjs',
  workerData: {},
  concurrency: 3
})

// Create Scheduler
const scheduler = await schedulerFactory({ workersPool })
// const queue = await scheduler.start()

// Create shared worker Cache
const sharedWorkerUrl = new URL('sharedMap.mjs', import.meta.url)
await sharedWorkerFactory({ fileName: sharedWorkerUrl, workersPool })

// Start work source
const source = workSource({maxIter: 40, delay: 20})

// Scheduler cycle
for await (const request of scheduler) {
  const task = await source.next()
  // console.log({ task,request })
  await request.respond(task)
}


console.log('Main done!')
