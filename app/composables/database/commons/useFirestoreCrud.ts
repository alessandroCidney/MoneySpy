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

export interface DatabaseObject {
  id: string
  name: string

  createdBy: string
  createdAt: number
}

export type PartialDatabaseObject<T extends DatabaseObject> = Omit<T, 'id' | 'createdAt' | 'createdBy'> & {
  id?: string

  createdBy?: string
  createdAt?: number
}

export function useFirestoreCrud<T extends DatabaseObject>(basePath: string) {
  const nuxtApp = useNuxtApp()

  return {
    async create(data: PartialDatabaseObject<T>) {
      data.createdAt = dateToUnixTimestamp(new Date())
      data.createdBy = nuxtApp.$firebaseAuth.currentUser?.uid

      if (!data.id) {
        data.id = uuidV4()
      }

      await setDoc(doc(nuxtApp.$firebaseFirestore, basePath, data.id), data)

      return data as T
    },

    async get(id: string) {
      const docRef = doc(nuxtApp.$firebaseFirestore, basePath, id)

      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return docSnap.data() as T
      } else {
        throw new ApplicationError('Document not found', 404)
      }
    },

    async list() {
      const q = query(collection(nuxtApp.$firebaseFirestore, basePath))

      const querySnapshot = await getDocs(q)

      return querySnapshot.docs.map(item => item.data()) as T[]
    },

    async remove(id: string) {
      await deleteDoc(doc(nuxtApp.$firebaseFirestore, basePath, id))
    },
  }
}
