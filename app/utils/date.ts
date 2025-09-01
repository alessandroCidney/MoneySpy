import _ from 'lodash'

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

export function getDayName(unixTime: number) {
  return _.startCase(unixTimestampToDate(unixTime).toLocaleDateString('pt', { weekday: 'short' }))
}

export function getLastSevenDays(baseDate = new Date()) {
  const goBackDays = 7

  const daysSorted = []

  for (let i = 0; i < goBackDays; i++) {
    const temporaryDate = new Date(baseDate)
    temporaryDate.setDate(temporaryDate.getDate() - i)

    daysSorted.push(getDayName(dateToUnixTimestamp(temporaryDate)))
  }

  daysSorted.reverse()

  return daysSorted
}
