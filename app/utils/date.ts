export function dateToUnixTimestamp(date: Date) {
  return Math.floor(date.getTime() / 1000)
}

export function unixTimestampToDate(unixTimestamp: number) {
  return new Date(unixTimestamp * 1000)
}
