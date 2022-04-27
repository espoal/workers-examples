import { workersFactory } from './utils/factory.mjs'
import { schedulerFactory } from './queue/scheduler.mjs'
import { sourceFactory } from './utils/workSource.mjs'

console.log('Main start!')

// Create Workers
const workersPool = workersFactory({
  fileName: './worker.mjs',
  workerData: {},
  concurrency: 2
})

// Create Scheduler
const scheduler = await schedulerFactory({
  workersPool
})
// const queue = await scheduler.start()

// Start work source
const { reader: workSource } = await sourceFactory({
  delay: 100,
  maxIters: 5
})

// Scheduler cycle
for await (const { port } of scheduler) {
  const task = await workSource.read()
  // TODO: don't deal with port directly
  await port.postMessage(task)
}


console.log('Main done!')
