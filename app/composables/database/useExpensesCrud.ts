import { useFirestoreCrud, type DatabaseObject } from './commons/useFirestoreCrud'

export const expenseTypes = [
  {
    name: 'Mercado',
    icon: 'mdi-store',
  },
  {
    name: 'Conta',
    icon: 'mdi-file-document-multiple',
  },
  {
    name: 'Delivery',
    icon: 'mdi-moped',
  },
  {
    name: 'Doação',
    icon: 'mdi-heart',
  },
  {
    name: 'Pagamento',
    icon: 'mdi-currency-usd',
  },
]

export interface DatabaseExpense extends DatabaseObject {
  value: number
  currency: string
  type: string
}

export function useExpensesCrud() {
  return useFirestoreCrud<DatabaseExpense>('expenses')
}
