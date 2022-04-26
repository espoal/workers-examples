import { parentPort, receiveMessageOnPort } from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'
import { ReadableStream } from 'node:stream/web'

const { message: parentStream } = receiveMessageOnPort(parentPort)

console.log({ parentStream })




let iters = 0

for await (const chunk of parentStream) {
  iters++
  console.log({ iters, chunk })
  if (chunk === undefined) break
  await setTimeout(100)
}

console.log('Worker Done!')


parentStream.cancel('')

parentPort.close()
