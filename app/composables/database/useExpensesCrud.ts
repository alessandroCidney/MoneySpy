import { useFirestoreCrud, type DatabaseObject } from './commons/useFirestoreCrud'

export const expenseTypes = [
  {
    id: 'market',
    name: 'Mercado',
    icon: 'mdi-store',
    type: 'expense',
  },
  {
    id: 'bill',
    name: 'Conta',
    icon: 'mdi-file-document-multiple',
    type: 'expense',
  },
  {
    id: 'education',
    name: 'Educação',
    icon: 'mdi-school',
    type: 'expense',
  },
  {
    id: 'delivery',
    name: 'Delivery',
    icon: 'mdi-moped',
    type: 'expense',
  },
  {
    id: 'donation',
    name: 'Doação',
    icon: 'mdi-heart',
    type: 'expense',
  },
  {
    id: 'inflow',
    name: 'Entrada',
    icon: 'mdi-currency-usd',
    type: 'income',
  },
  {
    id: 'inflow',
    name: 'Salário',
    icon: 'mdi-currency-usd',
    type: 'income',
  },
]

export function getExpenseTypeData(typeName: string) {
  return expenseTypes.find(item => item.name === typeName)
}

export interface DatabaseExpense extends DatabaseObject {
  value: number
  currency: string
  type: string
}

interface UseExpensesCrudParams {
  userId: string
}

export function useExpensesCrud(params?: UseExpensesCrudParams) {
  if (params?.userId) {
    return useFirestoreCrud<DatabaseExpense>(`users/${params.userId}/expenses`)
  }

  const authStore = useAuthStore()

  if (authStore.authUser) {
    return useFirestoreCrud<DatabaseExpense>(`users/${authStore.authUser.uid}/expenses`)
  }

  throw new Error('Unauthenticated')
}
