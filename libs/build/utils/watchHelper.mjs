const twoDigits = el => el < 10 ? `0${el}` : el

export const timeNow = (date = new Date()) =>
  `${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}:${twoDigits(date.getSeconds())}`


export const watchHelper = {
  onRebuild(error, result) {
    if (error) console.error('watch build failed:', error)
    else {
      console.log('watch build succeeded at time: ' + timeNow())
      const {errors, warnings} = result
      console.log({errors, warnings})
    }
  }
}
