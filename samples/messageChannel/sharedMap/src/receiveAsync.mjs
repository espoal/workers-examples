
export const receiveMessageOnPortAsync = (port) => {
  return new Promise((res,rej) => {
    port.onmessage = res
    port.onmessageerror = rej
  })
}
