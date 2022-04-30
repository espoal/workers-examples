import { Worker } from 'node:worker_threads'

// const url = await import.meta.resolve('./worker.mjs')

const url = './worker.mjs'

console.log({ url })

new Worker(new URL(url, import.meta.url))

console.log('Hello from main!')
