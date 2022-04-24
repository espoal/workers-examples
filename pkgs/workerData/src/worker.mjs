import { workerData } from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'

for (const chunk of workerData) {
  console.log({ chunk })
  await setTimeout(500)
}
