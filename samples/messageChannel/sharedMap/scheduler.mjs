import { workersFactory } from './src/factory.mjs'
import { schedulerFactory } from './src/QueueScheduler.mjs'
import { workSource } from './src/workSource.mjs'
import { SharedMap } from './src/SharedMap.mjs'

console.log('Main start!')

// Create Workers
const workersPool = workersFactory({
  fileName: './worker.mjs',
  workerData: {},
  concurrency: 2
})

// Create Scheduler
const scheduler = await schedulerFactory({ workersPool })

// Create Shared Map
const sharedMap = new SharedMap(workersPool)

// Start work source
const source = workSource({maxIter: 4, delay: 10})

// Scheduler cycle
for await (const request of scheduler) {
  const task = await source.next()
  await request.respond(task)
}


console.log('Main done!')
await sharedMap.close()

let counter = 0
for (const [key, value] of sharedMap.map) {
  console.log({ key, value, counter })
  counter++
}

