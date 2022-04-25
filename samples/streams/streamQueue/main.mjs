import { Worker } from 'node:worker_threads'
import { workerPromiseFactory } from '@libs/utils'
import { TransformStream } from 'node:stream/web'


const { writable, readable } = new TransformStream()

const workChunks = [...Array(4).keys()]

const worker = new Worker('./worker.mjs')

worker.postMessage(readable, [readable])

const writeStream = await writable.getWriter()

for (const chunk of workChunks ) {
  await writeStream.write(chunk)
}

await writeStream.releaseLock()
await writable.close()

worker.on('exit', code => {
  console.log('Done!')
})

