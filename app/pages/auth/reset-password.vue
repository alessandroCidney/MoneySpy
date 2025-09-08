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
      <h1 class="mb-7 font-weight-bold text-center">
        Redefinição de senha
      </h1>

      <p class="mb-10 text-center">
        Esqueceu sua senha? Informe seu e-mail para que possamos enviar um link de redefinição.
      </p>

      <v-form
        ref="formRef"
        @submit.prevent="handleSubmit()"
      >
        <v-text-field
          v-model="formPayload.email"
          :rules="[formRules.requiredString, formRules.validEmail]"
          :readonly="loading"
          label="Informe seu e-mail"
          placeholder="potatochips@example.com"
          variant="solo-filled"
          flat
        />

        <v-btn
          :loading="loading"
          type="submit"
          color="primary"
          variant="flat"
          size="x-large"
          rounded
          block
        >
          Enviar E-mail
        </v-btn>
      </v-form>
    </div>

    <div
      class="bottom-0 position-absolute mb-5"
    >
      Deseja voltar à página de login?

      <nuxt-link
        :to="{ name: 'auth-login' }"
        class="defaultAnchor"
      >
        Clique aqui
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

definePageMeta({
  middleware: 'unauthenticated',

  layout: 'auth',
})

const router = useRouter()

const messagesStore = useMessagesStore()

const formRules = useRules()

const formRef = useTemplateRef('formRef')

const formPayload = ref({
  email: '',
})

const loading = ref(false)

async function handleSubmit() {
  try {
    loading.value = true

    const validationResult = await formRef.value?.validate()

    if (validationResult?.valid) {
      const auth = getAuth()

      await sendPasswordResetEmail(auth, formPayload.value.email)

      messagesStore.showSuccessMessage({
        text: 'E-mail enviado. Por favor, verifique sua caixa de entrada.',
      })

      router.push({ name: 'auth-login' })
    }
  } catch (err) {
    globalErrorHandler(err)
  } finally {
    loading.value = false
  }
}
</script>
