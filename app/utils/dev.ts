import _ from 'lodash'

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generatePercentChange() {
  return _.sample([false, true, true])
}

export function generateFakeExpensesArr() {
  const fakeExpensesArr: DatabaseExpense[] = []

  for (let i = 1; i <= 7; i++) {
    const date = dateToUnixTimestamp(randomDate(new Date(2012, 0, 1), new Date()))

    if (generatePercentChange()) {
      fakeExpensesArr.push({
        id: i.toString(),
        createdAt: date,
        createdBy: 'abc',
        currency: 'R$',
        name: 'test',
        type: _.sample(['Mercado', 'Conta', 'Doação', 'Delivery']),
        value: getRandomInt(-500, -1),
      })
    }

    if (generatePercentChange()) {
      fakeExpensesArr.push({
        id: i.toString(),
        createdAt: date,
        createdBy: 'abc',
        currency: 'R$',
        name: 'test',
        type: _.sample(['Pagamento']),
        value: getRandomInt(1, 500),
      })
    }
  }

  return _.orderBy(fakeExpensesArr, item => item.createdAt, 'asc')
}
