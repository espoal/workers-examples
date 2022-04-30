import { TransformStream, ReadableStream, WritableStream } from 'node:stream/web'

const queue = []

const writableStream = new WritableStream({
  async start(controller) {
    /* … */
  },

  async write(chunk, controller) {
    /* … */
  },

  async close() {
    /* … */
  },
  async abort(reason) {
    /* */
  }
})

const readableStream = new ReadableStream({
  start(controller) {
    /* … */
  },

  pull(controller) {
    /* … */
  },

  cancel(reason) {
    /* … */
  },
})
