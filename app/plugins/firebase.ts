import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: runtimeConfig.public.API_KEY,
    authDomain: runtimeConfig.public.AUTH_DOMAIN,
    projectId: runtimeConfig.public.PROJECT_ID,
    storageBucket: runtimeConfig.public.STORAGE_BUCKET,
    messagingSenderId: runtimeConfig.public.MESSAGING_SENDER_ID,
    appId: runtimeConfig.public.APP_ID,
  }

  const firebaseApp = initializeApp(firebaseConfig)
  const firebaseFirestore = getFirestore(firebaseApp)

  return {
    provide: {
      firebaseApp,
      firebaseFirestore,
    },
  }
})
