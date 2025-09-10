import { getAuth } from 'firebase/auth'

import { useExpensesStore } from '~/stores/cruds/expenses'

async function loadAdditionalItems() {
  // Initial achievements
  const authStore = useAuthStore()
  const usersCrud = useUsersCrud()
  const notificationsStore = useNotificationsStore()

  if (authStore.databaseUser?.firstLogin && authStore.emailIsVerified && !authStore.incompleteProfile) {
    const result = await usersCrud.update({
      ...authStore.databaseUser,
      firstLogin: false,
    })

    authStore.setDatabaseUser(result as DatabaseUser)

    notificationsStore.addAchievementNotification('beginner')
  }

  // "Cached" cruds
  const expensesStore = useExpensesStore()
  expensesStore.list()
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
