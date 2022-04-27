import { setTimeout, setInterval } from 'node:timers/promises'

while (await setInterval(100))
  console.log('ciao')
