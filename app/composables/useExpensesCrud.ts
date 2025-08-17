import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from 'firebase/firestore'

import { v4 as uuidV4 } from 'uuid'

export interface Expense {
  id: string
  name: string

  createdBy: string
  createdAt: number

  value: number
  currency: string
  type: string
}

interface ExpenseCreationPayload
  extends Omit<Expense, 'id' | 'createdAt' | 'createdBy'> {
  id?: string

  createdBy?: string
  createdAt?: number
}

export function useExpensesCrud() {
  const basePath = 'expenses'

  const nuxtApp = useNuxtApp()

  return {
    async create(data: ExpenseCreationPayload) {
      data.createdAt = dateToUnixTimestamp(new Date())
      data.createdBy = 'test user'

      if (!data.id) {
        data.id = uuidV4()
      }

      await setDoc(doc(nuxtApp.$firebaseFirestore, basePath, data.id), data)

      return data as Expense
    },

    async get(id: string) {
      const docRef = doc(nuxtApp.$firebaseFirestore, basePath, id)

      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return docSnap.data() as Expense
      } else {
        throw new ApplicationError('Document not found', 404)
      }
    },

    async list() {
      const q = query(collection(nuxtApp.$firebaseFirestore, basePath))

      const querySnapshot = await getDocs(q)

      return querySnapshot.docs.map(item => item.data()) as Expense[]
    },

    async remove(id: string) {
      await deleteDoc(doc(nuxtApp.$firebaseFirestore, basePath, id))
    },
  }
}
