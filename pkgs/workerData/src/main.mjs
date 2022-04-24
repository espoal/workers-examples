import { workerPromiseFactory } from '@libs/utils'

const workerData = [...Array(4).keys()]

const worker = workerPromiseFactory({
  fileName: './worker.mjs',
  workerData
})

await worker

console.log('Done!')
