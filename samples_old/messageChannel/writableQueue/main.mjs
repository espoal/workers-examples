import { workersFactory } from './factory.mjs'
import { QueueWriter } from './QueueWriter.mjs'
import { setTimeout } from 'node:timers/promises'


const workChunks = [...Array(8).keys()]


const [workersPromise, workerPorts, workers] = workersFactory({
  fileName: './worker.mjs',
  workerData: {},
  concurrency: 2
})

const queue = new QueueWriter(workerPorts)

const writable = new WritableStream(queue)
const writer = await writable.getWriter()

while (workChunks.length ) {
  await writer.write(workChunks.shift())
  await setTimeout(200)
}
console.log('Done 33!')

await writer.close()

await workersPromise

console.log('Done!')

queue.close()


debugger
