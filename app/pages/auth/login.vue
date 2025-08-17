<template>
  <div>
    <v-btn @click="handleSignInWithGoogle">
      Entrar com o Google
    </v-btn>

    <v-btn @click="removeMyUser">
      Remover meu usuário
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { deleteUser, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const nuxtApp = useNuxtApp()

const googleProvider = new GoogleAuthProvider()

const usersCrud = useUsersCrud()

async function handleSignInWithGoogle() {
  try {
    const response = await signInWithPopup(nuxtApp.$firebaseAuth, googleProvider)

    await usersCrud.create({
      id: response.user.uid,
      name: response.user.displayName || 'Name not found',

      active: true,
    })

    window.location.reload()
  } catch (err) {
    globalErrorHandler(err)
  }
}

async function removeMyUser() {
  try {
    if (nuxtApp.$firebaseAuth.currentUser?.uid) {
      await usersCrud.remove(nuxtApp.$firebaseAuth.currentUser?.uid)

      await deleteUser(nuxtApp.$firebaseAuth.currentUser)

      window.location.reload()
    }
  } catch (err) {
    globalErrorHandler(err)
  }
}
</script>
