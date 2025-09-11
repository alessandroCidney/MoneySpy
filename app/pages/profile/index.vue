<template>
  <div class="defaultPageContainer">
    <h1 class="mb-4">
      Perfil
    </h1>

    <div class="mb-8">
      <h2 class="mb-4">
        Dados pessoais
      </h2>

      <p class="mb-4">
        Aqui você pode atualizar seus dados pessoais.
      </p>

      <v-form
        v-model="formIsValid"
        @submit.prevent="handleUpdateProfileData()"
      >
        <v-text-field
          v-model="formPayload.name"
          :rules="[formRules.requiredString]"
          :disabled="somethingIsLoading"
          label="Nome"
          variant="solo"
          rounded
          flat
        />

        <v-text-field
          v-model="formPayload.email"
          :rules="[formRules.requiredString]"
          :disabled="somethingIsLoading"
          label="E-mail"
          variant="solo"
          hint="Por enquanto o e-mail não pode ser alterado."
          readonly
          rounded
          flat
        />

        <v-btn
          :block="vuetifyDisplay.smAndDown.value"
          :loading="loading.updateProfileData"
          :disabled="somethingIsLoading && !loading.updateProfileData"
          variant="flat"
          width="300px"
          color="primary"
          size="large"
          type="submit"
          class="mt-2"
          rounded
        >
          Atualizar dados
        </v-btn>
      </v-form>
    </div>

    <div class="mb-8">
      <h2 class="mb-4">
        Acesso
      </h2>

      <p class="mb-4">
        Precisa ir embora? Ficaremos te esperando!
      </p>

      <v-btn
        :block="vuetifyDisplay.smAndDown.value"
        :loading="authStore.loadingSignOut"
        :disabled="somethingIsLoading"
        color="black"
        size="large"
        width="300px"
        prepend-icon="mdi-logout"
        rounded
        flat
        @click="authStore.handleSignOut()"
      >
        Sair
      </v-btn>
    </div>

    <div class="mb-8">
      <h2 class="mb-4">
        Exclusão de conta e dados
      </h2>

      <p class="mb-4">
        Deseja excluir sua conta? Tudo bem, sentiremos sua falta!
      </p>

      <v-btn
        :block="vuetifyDisplay.smAndDown.value"
        :loading="loading.deleteAccount"
        :disabled="somethingIsLoading && !loading.deleteAccount"
        color="error"
        size="large"
        width="300px"
        prepend-icon="mdi-logout"
        rounded
        flat
        @click="handleDeleteAccount()"
      >
        Excluir conta
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

definePageMeta({
  middleware: 'authenticated',
})

const authStore = useAuthStore()
const formRules = useRules()
const usersCrud = useUsersCrud()

const vuetifyDisplay = useDisplay()

const formIsValid = ref(false)

if (!authStore.databaseUser || !authStore.authUser) {
  throw new Error('Unauthenticated')
}

const formPayload = ref({
  name: authStore.databaseUser.name,
  email: authStore.authUser.email,
})

const loading = ref({
  updateProfileData: false,
  deleteAccount: false,
})

const somethingIsLoading = computed(() => Object.values(loading.value).some(item => item === true))

async function handleUpdateProfileData() {
  try {
    loading.value.updateProfileData = true

    if (!authStore.databaseUser) {
      throw new Error('Unauthenticated')
    }

    const result = await usersCrud.update({
      ...authStore.databaseUser,
      name: formPayload.value.name,
    })

    authStore.setDatabaseUser(result as DatabaseUser)
  } catch (err) {
    globalErrorHandler(err)
  } finally {
    loading.value.updateProfileData = false
  }
}

async function handleDeleteAccount() {
  try {
    loading.value.deleteAccount = true

    if (!authStore.databaseUser || !authStore.privateProfileData) {
      throw new ApplicationError({
        code: APP_ERROR_CODES.DEFAULT_ERRORS.UNAUTHORIZED,
        status: 401,
        message: 'Usuário não autenticado!',
      })
    }

    await usersCrud.update({
      ...authStore.databaseUser,

      name: '[DELETED]',

      active: false,
      deleted: true,

      profilePhoto: {
        type: 'icon',
        value: 'mdi-face-man',
      },
    })

    await usersCrud.updatePrivateProfileData(authStore.databaseUser.id, {
      ...authStore.privateProfileData,

      email: '[DELETED]',
    })

    await authStore.handleDeleteFirebaseAccount()

    window.location.reload()
  } catch (err) {
    globalErrorHandler(err)
  } finally {
    loading.value.deleteAccount = false
  }
}
</script>

<style lang="scss" scoped>
.profilePhotoAvatar {
  border: 3px solid #000;
}
</style>
