import type { RouteRecordNameGeneric } from 'vue-router'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  const routesWithoutRedirect: RouteRecordNameGeneric[] = ['auth-action']

  if (routesWithoutRedirect.includes(to.name)) {
    return
  }

  if (authStore.emailIsVerified === false && to.name !== 'auth-verify-email') {
    return navigateTo({
      name: 'auth-verify-email',
    })
  }

  if (authStore.emailIsVerified && to.name === 'auth-verify-email') {
    return navigateTo({
      name: 'home',
    })
  }

  if (authStore.incompleteProfile && to.name !== 'auth-complete-profile') {
    return navigateTo({
      name: 'auth-complete-profile',
    })
  }

  if (authStore.incompleteProfile === false && to.name === 'auth-complete-profile') {
    return navigateTo({
      name: 'home',
    })
  }

  if (!authStore.isAuthenticated) {
    return navigateTo({
      name: 'auth-join-us',
    })
  }
})
