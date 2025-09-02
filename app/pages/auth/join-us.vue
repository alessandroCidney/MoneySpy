<template>
  <div class="d-flex loginPageContainer">
    <div
      class="d-md-block d-none w-md-50 h-100"
    >
      <div
        class="w-100 h-100 ultraRounded overflow-hidden"
        :style="{
          backgroundImage: `url(${chartsAndCalcsImagePath})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }"
      >
        <!-- <div
          :style="{
            width: 'calc(100% - 20)',
            height: '300px',
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgb(255, 255, 255, .5)',
            border: '1px solid white',
          }"
          class="ma-5 rounded-xl overflow-hidden"
        /> -->
      </div>
    </div>

    <div
      class="w-md-50 w-100 h-100 d-flex align-center justify-center position-relative"
    >
      <v-img
        src="@/assets/images/logos/largeAppLogo.png"
        max-width="150px"
        min-width="150px"
        class="top-0 position-absolute mt-5"
      />

      <div class="px-5">
        <h1 class="font-weight-bold text-center">
          Criar nova conta
        </h1>

        <p class="mb-10 text-center">
          Crie uma nova conta para aproveitar todas as funcionalidades da plataforma!
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

          <forms-password-text-field
            v-model="createAccountPayload.confirmPassword"
            :rules="[(confirmPassword: unknown) => formRules.matchingPasswords(createAccountPayload.password, confirmPassword)]"
            label="Confirmar senha"
            variant="solo-filled"
            flat
          />

          <v-btn
            :loading="loadingCreateAccountWithEmailAndPassword"
            :disabled="loadingCreateAccountWithGoogle"
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
            :loading="loadingCreateAccountWithGoogle"
            :disabled="loadingCreateAccountWithEmailAndPassword"
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
          to="/auth/login"
          class="defaultAnchor"
        >
          Entrar
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createUserWithEmailAndPassword, deleteUser, getAuth, GoogleAuthProvider, signInWithPopup, signOut, type UserCredential } from 'firebase/auth'

import chartsAndCalcsImagePath from '@/assets/images/illustrations/chartsAndCalcs.png'
import googleLogo from '@/assets/images/logos/googleLogo.svg'

definePageMeta({
  middleware: 'unauthenticated',

  layout: 'clear',
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

const loadingCreateAccountWithEmailAndPassword = ref(false)
const loadingCreateAccountWithGoogle = ref(false)

async function completeRegister(userCredential: UserCredential) {
  await usersCrud.registerUser({
    baseData: {
      id: userCredential.user.uid,
      name: userCredential.user.displayName || '',

      active: true,
    },

    privateData: {
      email: userCredential.user.email,
    },
  })
}

async function handleCreateAccountWithEmailAndPassword() {
  try {
    loadingCreateAccountWithEmailAndPassword.value = true

    const validationResult = await createAccountFormRef.value?.validate()

    if (validationResult?.valid) {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        createAccountPayload.value.email,
        createAccountPayload.value.password,
      )

      await completeRegister(userCredential)

      window.location.reload()
    }
  } catch (err) {
    globalErrorHandler(err)

    handleSignOut()
  } finally {
    loadingCreateAccountWithEmailAndPassword.value = false
  }
}

async function handleCreateAccountWithGoogle() {
  try {
    loadingCreateAccountWithGoogle.value = true

    const googleProvider = new GoogleAuthProvider()

    googleProvider.setCustomParameters({
      prompt: 'select_account',
    })

    const userCredential = await signInWithPopup(nuxtApp.$firebaseAuth, googleProvider)

    await completeRegister(userCredential)

    window.location.reload()
  } catch (err) {
    globalErrorHandler(err)

    handleSignOut()
  } finally {
    loadingCreateAccountWithGoogle.value = false
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

<style lang="scss" scoped>
.loginPageContainer {
  height: 100dvh;
  padding: 1%;

  h1 {
    font-size: 4rem;
  }
}

@media(max-width: 550px) {
  .loginPageContainer {
    h1 {
      font-size: 3rem;
    }
  }
}
</style>
