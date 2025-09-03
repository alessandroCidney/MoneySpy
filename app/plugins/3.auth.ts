import { onAuthStateChanged, getAuth } from 'firebase/auth'

import { useExpensesStore } from '~/stores/cruds/expenses'

export default defineNuxtPlugin(async () => {
  const firebaseAuth = getAuth()

  const authStore = useAuthStore()

  const usersCrud = useUsersCrud()

  await new Promise<void>((resolve) => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (authUser) => {
      try {
        if (authUser) {
          const databaseUser = await usersCrud.get(authUser.uid)

          authStore.setAuthUser(authUser)
          authStore.setDatabaseUser(databaseUser)

          // load "cached" cruds
          const expensesStore = useExpensesStore()
          expensesStore.list()
        } else {
          throw new Error('Unauthenticated')
        }
      } catch (err) {
        globalErrorHandler(err)

        authStore.setAuthUser(null)
        authStore.setDatabaseUser(null)
      } finally {
        authStore.setLoadingAuth(false)

        unsubscribe()
        resolve()
      }
    })
  })
})
