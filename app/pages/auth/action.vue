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
        v-if="loading.initialCheck"
        color="primary"
        size="200"
        width="8"
        indeterminate
      />

      <template v-else>
        <template v-if="invalidLink">
          <h1 class="mb-7 font-weight-bold text-center">
            Link inválido
          </h1>

          <p class="mb-10 text-center">
            O link fornecido é inválido ou está expirado. Por favor, tente novamente.
          </p>

          <v-btn
            :to="{ name: 'auth-login' }"
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

        <template v-else-if="mode === 'resetPassword'">
          <h1 class="mb-7 font-weight-bold text-center">
            Definir nova senha
          </h1>

          <p class="mb-10 text-center">
            Escolha uma nova senha para a sua conta:
          </p>

          <v-form
            ref="resetPasswordFormRef"
            :readonly="loading.resetPassword"
            @submit.prevent="handleConfirmPasswordReset()"
          >
            <forms-password-text-field
              v-model="resetPasswordFormPayload.password"
              :rules="[formRules.strongPassword]"
              label="Nova senha"
              variant="solo-filled"
              flat
            />

            <forms-password-text-field
              v-model="resetPasswordFormPayload.confirmPassword"
              :rules="[(confirmPassword: unknown) => formRules.matchingPasswords(resetPasswordFormPayload.password, confirmPassword)]"
              label="Confirme a nova senha"
              variant="solo-filled"
              flat
            />

            <v-btn
              :loading="loading.resetPassword"
              color="primary"
              size="x-large"
              variant="flat"
              class="mb-4"
              type="submit"
              rounded
              block
            >
              Salvar
            </v-btn>
          </v-form>
        </template>

        <template v-else-if="mode === 'verifyEmail' && emailVerificationSuccess">
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
      Deseja voltar para o login?

      <button
        class="anchorStyle"
        @click="handleBackToLogin()"
      >
        Clique aqui
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { applyActionCode, confirmPasswordReset, getAuth, verifyPasswordResetCode } from 'firebase/auth'

definePageMeta({
  layout: 'auth',
})

const authStore = useAuthStore()
const messagesStore = useMessagesStore()

const route = useRoute()
const router = useRouter()

const { mode, oobCode: actionCode /* continueUrl, lang */ } = route.query

onMounted(startVerification)

const invalidLink = ref(false)
const emailVerificationSuccess = ref(true)

const loading = ref({
  initialCheck: false,
  resetPassword: false,
})

async function startVerification() {
  loading.value.initialCheck = true

  if (typeof actionCode !== 'string') {
    invalidLink.value = true
    return
  }

  switch (mode) {
    case 'resetPassword':
      await handleStartPasswordReset()
      break

    case 'recoverEmail':
      // TODO: Implement email recover
      invalidLink.value = true
      break

    case 'verifyEmail':
      await handleVerifyEmail()
      break

    default:
      invalidLink.value = true
  }

  loading.value.initialCheck = false
}

async function handleVerifyEmail() {
  try {
    const auth = getAuth()

    await applyActionCode(auth, actionCode as string)

    emailVerificationSuccess.value = true
  } catch {
    invalidLink.value = true
  }
}

const formRules = useRules()

const resetPasswordFormRef = useTemplateRef('resetPasswordFormRef')

const resetPasswordFormPayload = ref({
  password: '',
  confirmPassword: '',
})

async function handleStartPasswordReset() {
  try {
    if (typeof actionCode !== 'string') {
      throw new Error('Invalid action code')
    }

    const auth = getAuth()

    await verifyPasswordResetCode(auth, actionCode)
  } catch {
    invalidLink.value = true
  }
}

async function handleConfirmPasswordReset() {
  try {
    loading.value.resetPassword = true

    const validationResult = await resetPasswordFormRef.value?.validate()

    if (validationResult?.valid) {
      const auth = getAuth()

      await confirmPasswordReset(auth, actionCode as string, resetPasswordFormPayload.value.password)

      messagesStore.showSuccessMessage({
        text: 'Senha redefinida com sucesso!',
      })

      router.push({ name: 'auth-login' })
    }
  } catch (err) {
    globalErrorHandler(err)
  } finally {
    loading.value.resetPassword = false
  }
}

async function handleBackToLogin() {
  if (authStore.isAuthenticated) {
    await authStore.handleSignOut()
  }

  router.push({ name: 'auth-login' })
}
</script>
