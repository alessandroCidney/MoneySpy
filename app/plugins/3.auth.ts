import { onAuthStateChanged, getAuth } from 'firebase/auth'

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
