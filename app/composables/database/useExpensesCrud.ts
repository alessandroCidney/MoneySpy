import { useFirestoreCrud, type DatabaseObject } from './commons/useFirestoreCrud'

export const expenseTypes = [
  {
    id: 'market',
    name: 'Mercado',
    icon: 'mdi-store',
  },
  {
    id: 'bill',
    name: 'Conta',
    icon: 'mdi-file-document-multiple',
  },
  {
    id: 'delivery',
    name: 'Delivery',
    icon: 'mdi-moped',
  },
  {
    id: 'donation',
    name: 'Doação',
    icon: 'mdi-heart',
  },
  {
    id: 'inflow',
    name: 'Entrada',
    icon: 'mdi-currency-usd',
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
