export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (err) => {
    console.log(err)

    if (err instanceof Error) {
      showError(err)
    }
  })
})
