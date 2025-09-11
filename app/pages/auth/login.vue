<template>
  <div
    class="w-100 h-100 d-flex align-center justify-center position-relative"
  >
    <commons-app-logo
      :width="150"
      class="top-0 position-absolute mt-5"
    />

    <div class="px-5">
      <h1 class="mb-7 font-weight-bold text-center">
        Entrar
      </h1>

      <p class="mb-10 text-center">
        Faça login para aproveitar todas as funcionalidades da plataforma!
      </p>

      <v-form
        ref="createAccountFormRef"
        :readonly="somethingIsLoading"
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
          label="Senha"
          variant="solo-filled"
          flat
        />

        <div class="mb-3 text-subtitle-2">
          <nuxt-link
            :to="{ name: 'auth-reset-password' }"
            class="defaultAnchor"
          >
            Esqueci minha senha
          </nuxt-link>
        </div>

        <v-btn
          :loading="loading.emailAndPassword"
          :disabled="somethingIsLoading && !loading.emailAndPassword"
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
          :loading="loading.google"
          :disabled="somethingIsLoading && !loading.google"
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

      <div
        :style="{ maxWidth: '450px' }"
        class="text-caption text-disabled text-center mx-auto mt-3"
      >
        Ao continuar o login, você concorda com a versão mais recente de nossos

        <nuxt-link
          :to="{ name: 'documents-terms-of-use' }"
          class="defaultAnchor"
        >
          Termos de Uso
        </nuxt-link>

        e de nossa

        <nuxt-link
          :to="{ name: 'documents-privacy-policy' }"
          class="defaultAnchor"
        >
          Política de Privacidade
        </nuxt-link>.
      </div>
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

const authStore = useAuthStore()
const usersCrud = useUsersCrud()

const formRules = useRules()

const createAccountFormRef = useTemplateRef('createAccountFormRef')
const createAccountPayload = ref({
  email: '',
  password: '',
  confirmPassword: '',
})

const loading = ref({
  emailAndPassword: false,
  google: false,
})

const somethingIsLoading = computed(() => Object.values(loading.value).some(item => item === true))

async function handleSignInWithEmailAndPassword() {
  try {
    loading.value.emailAndPassword = true

    const validationResult = await createAccountFormRef.value?.validate()

    if (validationResult?.valid) {
      const auth = getAuth()

      const userCredential = await signInWithEmailAndPassword(
        auth,
        createAccountPayload.value.email,
        createAccountPayload.value.password,
      )

      await checkIfIsRegistered(userCredential.user.uid)

      window.location.reload()
    }
  } catch (err) {
    globalErrorHandler(err)
  } finally {
    loading.value.emailAndPassword = false
  }
}

async function checkIfIsRegistered(userId: string) {
  await usersCrud.get(userId)
}

async function handleSignInWithGoogle() {
  try {
    loading.value.google = true

    const googleProvider = new GoogleAuthProvider()

    googleProvider.setCustomParameters({
      prompt: 'select_account',
    })

    const userCredential = await signInWithPopup(nuxtApp.$firebaseAuth, googleProvider)

    /**
     * Signing in via Google automatically adds the account to the authentication service even if it's not in the database.
     * Therefore, the account must be removed from there if the user did not register on the account creation page.
     */
    await usersCrud.get(userCredential.user.uid)

    window.location.reload()
  } catch (err) {
    if (err instanceof ApplicationError && err.status === 404 && err.code === APP_ERROR_CODES.CRUD_OPERATIONS.DOCUMENT_NOT_FOUND) {
      await authStore.handleDeleteFirebaseAccount()

      globalErrorHandler(new ApplicationError({
        ...err,
        message: 'Conta não encontrada. Por favor, registre-se para continuar.',
      }))

      return
    }

    globalErrorHandler(err)
  } finally {
    loading.value.google = false
  }
}
</script>
