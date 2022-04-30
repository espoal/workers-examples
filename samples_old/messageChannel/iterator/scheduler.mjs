import { workersFactory } from './src/factory.mjs'
import { schedulerFactory } from './src/QueueScheduler.mjs'
import { workSource } from './src/workSource.mjs'

console.log('Main start!')

// Create Workers
const workersPool = workersFactory({
  fileName: './worker.mjs',
  workerData: {},
  concurrency: 2
})

// Create Scheduler
const scheduler = await schedulerFactory({ workersPool })
// const queue = await scheduler.start()

// Start work source
const source = workSource({})

// Scheduler cycle
for await (const request of scheduler) {
  const task = await source.next()
  // console.log({ task,request })
  await request.respond(task)
}


console.log('Main done!')
