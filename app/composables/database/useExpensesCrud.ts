import { useFirestoreCrud } from './useFirestoreCrud'

export function useExpensesCrud() {
  return useFirestoreCrud('expenses')
}
