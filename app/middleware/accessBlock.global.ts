export default defineNuxtRouteMiddleware((to) => {
  const runtimeConfig = useRuntimeConfig()

  const blockAppAccess = runtimeConfig.public.BLOCK_APP_ACCESS === 'true'

  if (blockAppAccess && to.name !== 'block') {
    return navigateTo({
      name: 'block',
    })
  }

  if (!blockAppAccess && to.name == 'block') {
    return navigateTo({
      name: 'home',
    })
  }
})
