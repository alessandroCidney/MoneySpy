<template>
  <div
    class="w-100 h-100 d-flex align-center justify-center position-relative"
  >
    <v-img
      src="@/assets/images/logos/largeAppLogo.png"
      max-width="150px"
      min-width="150px"
      class="top-0 position-absolute mt-5"
    />

    <div class="px-5">
      <h1 class="font-weight-bold text-center">
        Entrar
      </h1>

      <p class="mb-10 text-center">
        Faça login para aproveitar todas as funcionalidades da plataforma!
      </p>

      <v-form
        ref="createAccountFormRef"
      >
        <v-text-field
          v-model="createAccountPayload.email"
          :rules="[formRules.validEmail]"
          label="E-mail"
          variant="solo-filled"
          placeholder="potatochips@example.com"
          flat
        />

        <forms-password-text-field
          v-model="createAccountPayload.password"
          :rules="[formRules.strongPassword]"
          label="Senha"
          variant="solo-filled"
          flat
        />

        <v-btn
          :loading="loadingSignInWithEmailAndPassword"
          :disabled="loadingSignInWithGoogle"
          color="primary"
          size="x-large"
          variant="flat"
          class="mb-4"
          rounded
          block
          @click="handleSignInWithEmailAndPassword()"
        >
          Fazer login
        </v-btn>

        <v-btn
          :loading="loadingSignInWithGoogle"
          :disabled="loadingSignInWithEmailAndPassword"
          color="secondary"
          size="x-large"
          variant="outlined"
          rounded
          block
          @click="handleSignInWithGoogle()"
        >
          <template #prepend>
            <v-img
              :src="googleLogo"
              width="27px"
              height="27px"
            />
          </template>

          Entrar com o Google
        </v-btn>
      </v-form>
    </div>

    <div
      class="bottom-0 position-absolute mb-5"
    >
      Ainda não possui uma conta?

      <nuxt-link
        :to="{ name: 'auth-join-us' }"
        class="defaultAnchor"
      >
        Junte-se a nós!
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

import googleLogo from '@/assets/images/logos/googleLogo.svg'

definePageMeta({
  middleware: 'unauthenticated',

  layout: 'auth',
})

const nuxtApp = useNuxtApp()

const formRules = useRules()

const createAccountFormRef = useTemplateRef('createAccountFormRef')
const createAccountPayload = ref({
  email: '',
  password: '',
  confirmPassword: '',
})

const loadingSignInWithEmailAndPassword = ref(false)
const loadingSignInWithGoogle = ref(false)

async function handleSignInWithEmailAndPassword() {
  try {
    loadingSignInWithEmailAndPassword.value = true

    const validationResult = await createAccountFormRef.value?.validate()

    if (validationResult?.valid) {
      const auth = getAuth()

      await signInWithEmailAndPassword(
        auth,
        createAccountPayload.value.email,
        createAccountPayload.value.password,
      )

      window.location.reload()
    }
  } catch (err) {
    globalErrorHandler(err)
  } finally {
    loadingSignInWithEmailAndPassword.value = false
  }
}

async function handleSignInWithGoogle() {
  try {
    loadingSignInWithGoogle.value = true

    const googleProvider = new GoogleAuthProvider()

    googleProvider.setCustomParameters({
      prompt: 'select_account',
    })

    await signInWithPopup(nuxtApp.$firebaseAuth, googleProvider)

    window.location.reload()
  } catch (err) {
    globalErrorHandler(err)
  } finally {
    loadingSignInWithGoogle.value = false
  }
}
</script>
