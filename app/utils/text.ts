// https://stackoverflow.com/questions/9345136/1000000-to-1m-and-1000-to-1k-and-so-on-in-js
export function formatNumberToSmallStr(numberValue: number, decimalPlaces = 1) {
  if (numberValue < 1000) {
    return numberValue
  }

  const numberLength = numberValue.toString().length

  decimalPlaces = Math.pow(10, decimalPlaces)

  const x = numberLength - numberLength % 3

  const selectedLetter = ' KMGTPE'[x / 3]

  const minimizedNumber = Math.round(numberValue * decimalPlaces / Math.pow(10, x)) / decimalPlaces

  return selectedLetter
    ? `${minimizedNumber}${selectedLetter}`
    : numberValue
}
