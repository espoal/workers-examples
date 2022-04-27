import { workersFactory } from './factory.mjs'
import {
  WorkerRequestsStream,
  WorkerResponseStream
} from './streams.mjs'
import { WorkSourceStream } from './workSource.mjs'

console.log('Main Start!')

const [workersPromise, workerPorts, workers] = workersFactory({
  fileName: './worker.mjs',
  workerData: {},
  concurrency: 2
})

const workerRequestsStream = new ReadableStream(new WorkerRequestsStream(workerPorts))
const workSourceStream = new ReadableStream(new WorkSourceStream(100, 3))
const workSourceStreamReader = await workSourceStream.getReader()

const workerResponseStream = new WritableStream(new WorkerResponseStream(workerPorts))
const workerResponseStreamWriter = await workerResponseStream.getWriter()

for await (const req of workerRequestsStream) {
  const { data } = req
  const workUnit = await workSourceStreamReader.read()

  await workerResponseStreamWriter.write({ workerPort: data, ...workUnit })

}

// TODO: workerRequestStream should terminate

console.log('Main Done!')


