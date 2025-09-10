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
        Verifique seu e-mail
      </h1>

      <p class="mb-10 text-center">
        Verifique sua caixa de entrada e acesse o link disponível no e-mail de verificação para concluir a configuração da sua conta.
      </p>

      <p class="mb-10 text-center">
        Caso não tenha recebido o e-mail, clique no botão abaixo para fazer um novo envio.
      </p>

      <v-btn
        :loading="loadingSendEmailVerification"
        :disabled="authStore.loadingSignOut"
        color="primary"
        size="x-large"
        variant="flat"
        class="mb-4"
        rounded
        block
        @click="handleSendEmailVerification()"
      >
        Enviar novamente
      </v-btn>
    </div>

    <div
      class="bottom-0 position-absolute mb-5"
    >
      Colocou o e-mail errado?

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
import { getAuth, sendEmailVerification } from 'firebase/auth'

definePageMeta({
  middleware: 'authenticated',

  layout: 'auth',
})

const authStore = useAuthStore()

const loadingSendEmailVerification = ref(false)

async function handleSendEmailVerification() {
  try {
    loadingSendEmailVerification.value = true

    const auth = getAuth()

    if (!auth.currentUser) {
      throw new ApplicationError({
        code: APP_ERROR_CODES.GENERIC_ERRORS.UNIDENTIFIED_ERROR,
        status: 500,
        message: 'Erro durante a inicialização do fluxo de verificação de e-mail.',
      })
    }

    await sendEmailVerification(auth.currentUser)
  } catch (err) {
    globalErrorHandler(err)
  } finally {
    loadingSendEmailVerification.value = false
  }
}
</script>
