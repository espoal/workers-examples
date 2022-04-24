import { Worker } from 'node:worker_threads'
import { TransformStream } from 'node:stream/web'

export const workerStreamFactory = ({fileName, workerData} ) => {
  const {readable, writable} = new TransformStream()
  const writer = writable.getWriter()

  const worker = new Worker(fileName, {
    workerData,
  })
  worker.on('message', msg => writer.write(msg))
  worker.on('exit', code => {
    writer.releaseLock()
    writable.close()
  })
  return {readable, writable, worker}
}
