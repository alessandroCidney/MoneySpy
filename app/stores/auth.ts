import { getAuth, signOut, type User } from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    databaseUser: null as DatabaseUser | null,
    authUser: null as User | null,

    loadingAuth: true,
    loadingSignOut: false,
  }),

  getters: {
    isAuthenticated(state) {
      return !!state.databaseUser && !!state.authUser
    },

    emailIsVerified(state) {
      return state.authUser?.emailVerified
    },

    incompleteProfile(state) {
      return !state.databaseUser?.name || !state.databaseUser.profilePhoto
    },

    validatedAuthUser(state) {
      if (!state.authUser) {
        throw new Error('Unauthenticated')
      }

      return state.authUser
    },

    userProfilePhoto(state) {
      let profilePhotoData: DatabaseUser['profilePhoto'] = {
        type: 'icon',
        value: 'mdi-face-man',
      }

      if (state.databaseUser?.profilePhoto?.type === 'providerPhoto') {
        const providerPhotoUrl = state.authUser?.providerData.find(item => item.providerId === state.databaseUser?.profilePhoto?.value)?.photoURL

        if (providerPhotoUrl) {
          profilePhotoData = {
            type: 'providerPhoto',
            url: providerPhotoUrl,
          }
        }
      }

      return profilePhotoData
    },
  },

  actions: {
    setAuthUser(data: typeof this.authUser) {
      this.authUser = data
    },

    setDatabaseUser(data: typeof this.databaseUser) {
      this.databaseUser = data
    },

    setLoadingAuth(data: typeof this.loadingAuth) {
      this.loadingAuth = data
    },

    async handleSignOut() {
      try {
        this.loadingSignOut = true

        const auth = getAuth()

        await signOut(auth)
      } catch (err) {
        globalErrorHandler(err)
      } finally {
        window.location.reload()

        this.loadingSignOut = false
      }
    },
  },
})
