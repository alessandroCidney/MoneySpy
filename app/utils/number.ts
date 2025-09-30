export function stringToNumber(value: string | number) {
  return typeof value === 'string' ? parseFloat(value) : value
}

export function isValidNumber(value: string | number) {
  return !isNaN(stringToNumber(value))
}
