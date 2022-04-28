
export const receiveMessageOnPortAsync = (port) => {
  return new Promise((res,rej) => {
    port.onmessage = (msg) => {
      res(msg)
    }
    port.onmessageerror = (err) => {
      rej(err)
    }
  })
}
