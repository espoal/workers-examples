import { workersFactory } from './factory.mjs'
import { QueueWriter } from './QueueWriter.mjs'
import { setTimeout } from 'node:timers/promises'


const workChunks = [...Array(500).keys()]




const [workersPromise, workerPorts, workers] = workersFactory({
  fileName: './worker.mjs',
  workerData: {},
  concurrency: 4
})


const queue = new QueueWriter(workerPorts)

const writable = new WritableStream(queue)
const writer = await writable.getWriter()

while (workChunks.length ) {
  await writer.write(workChunks.shift())
  await setTimeout(20)
}
console.log('Done 33!')

console.log({ workChunks })

await writer.close()

await workersPromise

console.log('Done!')

queue.close()


debugger
