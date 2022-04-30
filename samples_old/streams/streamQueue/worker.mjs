import { receiveMessageOnPort, parentPort } from 'node:worker_threads'
import { setTimeout } from 'node:timers/promises'


const { message: readable } = receiveMessageOnPort(parentPort)

console.log({ readable })


for await (const chunk of readable) {
  await setTimeout(100)
  console.log({ chunk })
}
