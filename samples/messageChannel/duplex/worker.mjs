import { parentPort, receiveMessageOnPort, threadId } from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'
import { ReadableStream } from 'node:stream/web'
import { WorkRequestStream, WorkSourceStream } from './workerStreams.mjs'
import { randomUUID } from 'node:crypto'

console.log('Worker Start!')
debugger

const {message: queuePort} = receiveMessageOnPort(parentPort)

debugger

// const id = randomUUID()

const workSourceStream = new ReadableStream(new WorkSourceStream(queuePort))
const workRequestStream = new WritableStream(new WorkRequestStream(queuePort))
const workRequestWriter = await workRequestStream.getWriter()

queuePort.postMessage(threadId)
for await (const workUnit of workSourceStream ) {
  const { value, done } = workUnit
  console.log({ value, done, threadId })
  await setTimeout(100)
  await workRequestWriter.write(threadId)
}


console.log('Worker done!')
