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
        Criar nova conta
      </h1>

      <p class="mb-10 text-center">
        Crie uma nova conta para aproveitar todas as funcionalidades da plataforma!
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
          :rules="[formRules.strongPassword]"
          label="Senha"
          variant="solo-filled"
          flat
        />

        <forms-password-text-field
          v-model="createAccountPayload.confirmPassword"
          :rules="[(confirmPassword: unknown) => formRules.matchingPasswords(createAccountPayload.password, confirmPassword)]"
          label="Confirmar senha"
          variant="solo-filled"
          flat
        />

        <v-btn
          :loading="loading.emailAndPassword"
          :disabled="somethingIsLoading && !loading.emailAndPassword"
          color="primary"
          size="x-large"
          variant="flat"
          class="mb-4"
          rounded
          block
          @click="handleCreateAccountWithEmailAndPassword()"
        >
          Criar conta
        </v-btn>

        <v-btn
          :loading="loading.google"
          :disabled="somethingIsLoading && !loading.google"
          color="secondary"
          size="x-large"
          variant="outlined"
          rounded
          block
          @click="handleCreateAccountWithGoogle()"
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
      Já possui uma conta?

      <nuxt-link
        :to="{ name: 'auth-login' }"
        class="defaultAnchor"
      >
        Entrar
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendEmailVerification, signInWithPopup, signOut, type UserCredential } from 'firebase/auth'

import googleLogo from '@/assets/images/logos/googleLogo.svg'

definePageMeta({
  middleware: 'unauthenticated',

  layout: 'auth',
})

const nuxtApp = useNuxtApp()

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

async function completeRegister(userCredential: UserCredential) {
  await usersCrud.registerUser({
    baseData: {
      id: userCredential.user.uid,
      name: userCredential.user.displayName || '',

      active: true,
      deleted: false,
      firstLogin: true,
    },

    privateData: {
      email: userCredential.user.email,
    },
  })
}

async function handleCreateAccountWithEmailAndPassword() {
  try {
    loading.value.emailAndPassword = true

    const validationResult = await createAccountFormRef.value?.validate()

    if (validationResult?.valid) {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        createAccountPayload.value.email,
        createAccountPayload.value.password,
      )

      await completeRegister(userCredential)

      if (!auth.currentUser) {
        throw new ApplicationError({
          code: APP_ERROR_CODES.GENERIC_ERRORS.UNIDENTIFIED_ERROR,
          status: 500,
          message: 'Erro durante a inicialização do fluxo de verificação de e-mail.',
        })
      }

      await sendEmailVerification(auth.currentUser)

      window.location.reload()
    }
  } catch (err) {
    if (err instanceof ApplicationError && err.status === 409) {
      globalErrorHandler(new ApplicationError({
        ...err,
        message: 'O usuário já está cadastrado! Faça login para continuar',
      }))
    } else {
      globalErrorHandler(err)
    }

    handleSignOut()
  } finally {
    loading.value.emailAndPassword = false
  }
}

async function handleCreateAccountWithGoogle() {
  try {
    loading.value.google = true

    const googleProvider = new GoogleAuthProvider()

    googleProvider.setCustomParameters({
      prompt: 'select_account',
    })

    const userCredential = await signInWithPopup(nuxtApp.$firebaseAuth, googleProvider)

    await completeRegister(userCredential)

    window.location.reload()
  } catch (err) {
    if (err instanceof ApplicationError && err.status === 409) {
      globalErrorHandler(new ApplicationError({
        ...err,
        message: 'O usuário já está cadastrado! Faça login para continuar',
      }))
    } else {
      globalErrorHandler(err)
    }

    handleSignOut()
  } finally {
    loading.value.google = false
  }
}

async function handleSignOut() {
  try {
    const auth = getAuth()

    await signOut(auth)
  } catch (err) {
    globalErrorHandler(err)
  }
}
</script>
