import { useFirestoreCrud, type DatabaseObject } from './commons/useFirestoreCrud'

export interface DatabaseExpense extends DatabaseObject {
  value: number
  currency: string
  type: string
}

export function useExpensesCrud() {
  return useFirestoreCrud<DatabaseExpense>('expenses')
}
