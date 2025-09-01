import { onAuthStateChanged, getAuth } from 'firebase/auth'

import { useExpensesStore } from '~/stores/cruds/expenses'

export default defineNuxtPlugin(async () => {
  const firebaseAuth = getAuth()

  const authStore = useAuthStore()

  const usersCrud = useUsersCrud()

  onAuthStateChanged(firebaseAuth, async (authUser) => {
    try {
      if (authUser) {
        const databaseUser = await usersCrud.get(authUser.uid)

        authStore.setAuthUser(authUser)
        authStore.setDatabaseUser(databaseUser)

        // load "cached" cruds
        const expensesStore = useExpensesStore()
        await expensesStore.list()
      } else {
        authStore.setAuthUser(null)
        authStore.setDatabaseUser(null)
      }
    } catch (err) {
      globalErrorHandler(err)
    } finally {
      authStore.setAuthLoading(false)
    }
  })
})
