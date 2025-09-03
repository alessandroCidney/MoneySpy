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
      <v-progress-circular
        v-if="loadingVerification"
        color="primary"
        size="200"
        width="8"
        indeterminate
      />

      <template v-else>
        <template v-if="invalidMode">
          <h1 class="mb-7 font-weight-bold text-center">
            Link inválido
          </h1>

          <p class="mb-10 text-center">
            O link fornecido não possui uma estrutura válida. Por favor, verifique se acessou a URL correta.
          </p>
        </template>

        <template v-else-if="invalidEmailLink">
          <h1 class="mb-7 font-weight-bold text-center">
            Link inválido
          </h1>

          <p class="mb-10 text-center">
            O link para verificação de e-mail fornecido é inválido ou está expirado. Por favor, tente novamente.
          </p>

          <v-btn
            :to="{ name: 'auth-verify-email' }"
            prepend-icon="mdi-arrow-left"
            color="secondary"
            size="x-large"
            variant="flat"
            class="mb-4"
            rounded
            block
          >
            Voltar
          </v-btn>
        </template>

        <template v-else-if="emailVerificationSuccess">
          <h1 class="mb-7 font-weight-bold text-center">
            Verificação concluída!
          </h1>

          <p class="mb-10 text-center">
            Seu e-mail foi verificado com sucesso! Clique no botão abaixo para continuar.
          </p>

          <v-btn
            prepend-icon="mdi-arrow-right"
            color="primary"
            size="x-large"
            variant="flat"
            class="mb-4"
            rounded
            block
            @click="reloadNuxtApp()"
          >
            Continuar
          </v-btn>
        </template>
      </template>
    </div>

    <div
      class="bottom-0 position-absolute mb-5"
    >
      Acessou o link errado?

      <button
        class="anchorStyle"
        @click="authStore.handleSignOut()"
      >
        Voltar para o início
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { applyActionCode, getAuth } from 'firebase/auth'

definePageMeta({
  middleware: 'authenticated',

  layout: 'auth',
})

const authStore = useAuthStore()

const route = useRoute()

const { mode, oobCode: actionCode /* continueUrl, lang */ } = route.query

onMounted(startVerification)

const loadingVerification = ref(false)

const invalidMode = ref(false)

const invalidEmailLink = ref(false)
const emailVerificationSuccess = ref(true)

async function startVerification() {
  loadingVerification.value = true

  switch (mode) {
    case 'resetPassword':
      // TODO: Implement password reset
      invalidMode.value = true
      break

    case 'recoverEmail':
      // TODO: Implement email recover
      invalidMode.value = true
      break

    case 'verifyEmail':
      await handleVerifyEmail()
      break

    default:
      invalidMode.value = true
  }

  loadingVerification.value = false
}

async function handleVerifyEmail() {
  try {
    if (typeof actionCode !== 'string') {
      throw new Error('Invalid action code')
    }

    const auth = getAuth()

    await applyActionCode(auth, actionCode)

    emailVerificationSuccess.value = true
  } catch {
    invalidEmailLink.value = true
  }
}
</script>
