import { Worker } from 'node:worker_threads'

export const workersFactory = ({fileName, workerData, concurrency}) => {
  const workersPool = []

  for (let index = 0; index < concurrency; index++) {
    const worker = new Worker(fileName, {
      workerData: {
        ...workerData,
        index
      }
    })
    workersPool.push(worker)
  }

  return workersPool
}
