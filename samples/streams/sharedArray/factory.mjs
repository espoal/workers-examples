import { Worker } from 'node:worker_threads'


export const promiseFactory = ({fileName, workerData} ) => {
  const worker = new Worker(fileName, {
    workerData,
  })
  return [(new Promise((resolve, reject) => {
    worker.on('error', reject)
    worker.on('exit', resolve)
  })), worker]
}

export const workersFactory = ({fileName, workerData, concurrency, sab} ) => {
  const workersPromises = []
  const workers = []

  for (let i = 0; i<concurrency; i++) {
    const [ workerPromise, worker ] = promiseFactory({
      fileName, workerData: { chunk: i, concurrency, ...workerData}
    })

    worker.postMessage(sab)

    workersPromises.push(workerPromise)
    workers.push(worker)
  }


  return [ Promise.all(workersPromises), workers ]
}
