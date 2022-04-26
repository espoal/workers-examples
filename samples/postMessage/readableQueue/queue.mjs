
export const queueFactory = ({ workers, handler }) => {

  for (const worker of workers) {
    worker.on('message', msg => {
      console.log({msg})
      worker.postMessage(handler())
    })
  }

}
