import { parentPort } from 'node:worker_threads'

parentPort.onmessage = ev => {

  const { data } = ev

  parentPort.postMessage('Hello ' + data)

}
