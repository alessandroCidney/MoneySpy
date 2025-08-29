export function dateToUnixTimestamp(date: Date) {
  return Math.floor(date.getTime() / 1000)
}

export function unixTimestampToDate(unixTimestamp: number) {
  return new Date(unixTimestamp * 1000)
}

export function dateToLargeStr(unixTime: number) {
  const formatter = new Intl.DateTimeFormat('pt', {
    hour12: true,
    day: 'numeric',
    month: 'long',
    year: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return formatter.format(unixTimestampToDate(unixTime))
}
