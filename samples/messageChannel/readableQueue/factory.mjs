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

export const workersFactory = ({fileName, workerData, concurrency, handler} ) => {
  const workers = []
  const workersPromises = []
  const workersPorts = []



  for (let i = 0; i<concurrency; i++) {
    const [ workerPromise, worker ] = promiseFactory({
      fileName, workerData: { chunk: i, concurrency, ...workerData}
    })
    const { port1, port2 } = new MessageChannel()
    workersPromises.push(workerPromise)
    workersPorts.push(port1)
    port1.onmessage = msg => {
      console.log({ msg })
      port1.postMessage(handler())
    }
    worker.postMessage(port2, [port2])
    workers.push(worker)
  }


  return [ Promise.all(workersPromises), workersPorts, workers ]
}
