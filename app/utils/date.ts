import _ from 'lodash'

export function dateToUnixTimestamp(date: Date) {
  return Math.floor(date.getTime() / 1000)
}

export function unixTimestampToDate(unixTimestamp: number) {
  return new Date(unixTimestamp * 1000)
}

export function getCurrentUnixTime() {
  return dateToUnixTimestamp(new Date())
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

export function filterByTheLastSevenDays<T extends DatabaseObject>(arr: T[]) {
  /**
   * This calculation will return the start of the day after the day seven days ago.
   * Example: If today is Monday, the calculation will not return Monday, but rather the start of Tuesday.
   *
   * If you want the "literal" behavior, try using "7" instead of "6" days in the calculation and remove the line with "setHours".
   */
  const sevenDaysAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)

  sevenDaysAgo.setHours(0, 0, 0, 0)

  return arr.filter((item) => {
    return item.createdAt >= dateToUnixTimestamp(sevenDaysAgo)
  })
}
