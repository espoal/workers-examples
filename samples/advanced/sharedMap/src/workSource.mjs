import { setTimeout } from 'node:timers/promises'

export const workSource = async function*({ maxIter = 5, delay = 100}) {

  let i = 0

  while (i < maxIter) {
    await setTimeout(delay)
    yield i++
  }

  return i++

}
