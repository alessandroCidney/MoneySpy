import type { User } from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    databaseUser: null as DatabaseUser | null,
    authUser: null as User | null,

    authLoading: true,
  }),

  getters: {
    validatedAuthUser(state) {
      if (!state.authUser) {
        throw new Error('Unauthenticated')
      }

      return state.authUser
    },

    validatedProfilePhoto(state) {
      if (!state.authUser) {
        throw new Error('Unauthenticated')
      }

      return state.authUser.photoURL || ''
    },
  },

  actions: {
    setAuthUser(data: typeof this.authUser) {
      this.authUser = data
    },

    setDatabaseUser(data: typeof this.databaseUser) {
      this.databaseUser = data
    },

    setAuthLoading(data: typeof this.authLoading) {
      this.authLoading = data
    },
  },
})
