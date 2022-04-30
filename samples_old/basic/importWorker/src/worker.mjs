import { threadId } from 'node:worker_threads'

export const url = import.meta.url

console.log(`Hello from ${threadId} worker!`)
