import { Worker } from 'node:worker_threads'

export const workerPromiseFactory = ({fileName, workerData} ) => {
  const worker = new Worker(fileName, {
    workerData,
  })
  return new Promise((resolve, reject) => {
    worker.on('error', reject)
    worker.on('exit', resolve)
  })
}

export const promiseFactory = ({fileName, workerData} ) => {
  const worker = new Worker(fileName, {
    workerData,
  })
  return [(new Promise((resolve, reject) => {
    worker.on('error', reject)
    worker.on('exit', resolve)
  })), worker]
}
