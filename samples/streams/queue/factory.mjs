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

export const workersFactory = ({fileName, workerData, concurrency, queueStream} ) => {
  const workersPromises = []
  const workers = []
  const readerStreams = queueStream.tee()

  for (let i = 0; i<concurrency; i++) {
    const [ workerPromise, worker ] = promiseFactory({
      fileName, workerData: { chunk: i, concurrency, ...workerData}
    })
    if (!readerStreams.length) readerStreams.push(queueStream.tee())
    const readerStream = readerStreams.shift()
    worker.postMessage(readerStream, [readerStream])
    workersPromises.push(workerPromise)
    workers.push(worker)
  }

  // queueStream.cancel()
  // readerStreams.map(stream => stream.cancel())

  return [ Promise.all(workersPromises), workers ]
}
