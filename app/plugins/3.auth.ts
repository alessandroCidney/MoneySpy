import { getAuth } from 'firebase/auth'

import { useExpensesStore } from '~/stores/cruds/expenses'

async function loadAdditionalItems() {
  const authStore = useAuthStore()
  const usersCrud = useUsersCrud()
  const notificationsStore = useNotificationsStore()

  // "Cached" cruds
  const expensesStore = useExpensesStore()
  expensesStore.list()

  // First login
  if (authStore.databaseUser?.firstLogin && authStore.emailIsVerified && !authStore.incompleteProfile) {
    const result = await usersCrud.update({
      ...authStore.databaseUser,
      firstLogin: false,
    })

    authStore.setDatabaseUser(result as DatabaseUser)

    notificationsStore.addAchievementNotification('beginner')
  }
}

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  const usersCrud = useUsersCrud()

  const auth = getAuth()

  await auth.authStateReady()

  const authUser = auth.currentUser

  try {
    if (authUser) {
      const databaseUser = await usersCrud.get(authUser.uid)
      const databaseUserPrivateData = await usersCrud.getPrivateProfileData(authUser.uid)

      authStore.setAuthUser(authUser)
      authStore.setDatabaseUser(databaseUser)
      authStore.setPrivateProfileData(databaseUserPrivateData)

      loadAdditionalItems()
    } else {
      throw new Error('Unauthenticated')
    }
  } catch {
    authStore.setAuthUser(null)
    authStore.setDatabaseUser(null)
    authStore.setPrivateProfileData(null)
  } finally {
    authStore.setLoadingAuth(false)
  }
})
