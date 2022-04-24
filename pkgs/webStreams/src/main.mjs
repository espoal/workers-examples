import { workerStreamFactory } from './workerFactory.mjs'

const {readable, worker} = workerStreamFactory({
  fileName: await import.meta.resolve('./worker.mjs'),
})

let iterations = 0

worker.postMessage(`World times ${iterations}`)

for await (const msg of readable) {
  iterations++

  console.log({msg})
  worker.postMessage(`World times ${iterations}`)
  if (iterations > 7) await worker.terminate()
}

console.log('Done !')
