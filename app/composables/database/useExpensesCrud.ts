import { useFirestoreCrud, type DatabaseObject } from './commons/useFirestoreCrud'

export interface DatabaseExpense extends DatabaseObject {
  value: number
  currency: string
  type: string
}

interface UseExpensesCrudParameters {
  userId: string
}

export function useExpensesCrud(params: UseExpensesCrudParameters) {
  return useFirestoreCrud<DatabaseExpense>(`users/${params.userId}/expenses`)
}
