import { Worker, MessageChannel } from 'node:worker_threads'


export const promiseFactory = ({fileName, workerData} ) => {
  const worker = new Worker(fileName, {
    workerData,
  })
  return [(new Promise((resolve, reject) => {
    worker.on('error', reject)
    worker.on('exit', resolve)
  })), worker]
}

export const workersFactory = ({fileName, workerData, concurrency} ) => {
  const workers = []
  const workersPromises = []
  const workersPorts = []

  for (let workerId = 0; workerId<concurrency; workerId++) {
    const [ workerPromise, worker ] = promiseFactory({
      fileName, workerData: { workerId, concurrency, ...workerData}
    })
    const { port1, port2 } = new MessageChannel()
    workersPromises.push(workerPromise)
    workersPorts.push(port1)

    worker.postMessage(port2, [port2])
    workers.push(worker)
  }

  const workersPromise = Promise.all(workersPromises)


  return { workersPromise, workersPorts, workers }
}
