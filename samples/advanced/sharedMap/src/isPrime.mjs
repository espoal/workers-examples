export const isPrime = ({ number, primesList }) => {
  if (number < 2n) return false
  for (let i = 2n; i*i<number; i++) {
    if (number % i === 0n) return false
  }
  return true
}
