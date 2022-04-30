import { parentPort, receiveMessageOnPort, threadId } from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'
import { ReadableStream } from 'node:stream/web'
import { QueueReader } from './QueueReader.mjs'
import { randomUUID } from 'node:crypto'

const {message: queuePort} = receiveMessageOnPort(parentPort)

// const id = randomUUID()

const queue = new QueueReader(queuePort)

const queueStream = new ReadableStream(queue)


let iters = 0


for await (const readerChunk of queueStream) {
  // console.log({ readerChunk })
  iters++
  console.log({ iters, threadId })
  await setTimeout(300)
}

console.log('Worker Done!')

queueStream.cancel()
queuePort.close()
parentPort.close()
process.exit()

