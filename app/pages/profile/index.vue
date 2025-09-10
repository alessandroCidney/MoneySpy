<template>
  <div class="defaultPageContainer">
    <h1 class="mb-4">
      Perfil
    </h1>

    <section class="mb-8">
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
          :disabled="loadingUpdateProfileData"
          label="Nome"
          variant="solo"
          rounded
          flat
        />

        <v-text-field
          v-model="formPayload.email"
          :rules="[formRules.requiredString]"
          :disabled="loadingUpdateProfileData"
          label="E-mail"
          variant="solo"
          hint="Por enquanto o e-mail não pode ser alterado."
          readonly
          rounded
          flat
        />

        <v-btn
          :loading="loadingUpdateProfileData"
          variant="flat"
          color="primary"
          size="large"
          type="submit"
          class="mt-2"
          rounded
        >
          Atualizar dados
        </v-btn>
      </v-form>
    </section>

    <section>
      <h2 class="mb-4">
        Acesso
      </h2>

      <v-btn
        :loading="loadingSignOut"
        color="black"
        size="large"
        width="150px"
        prepend-icon="mdi-logout"
        rounded
        flat
        @click="handleSignOut()"
      >
        Sair
      </v-btn>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth'

definePageMeta({
  middleware: 'authenticated',
})

const authStore = useAuthStore()
const formRules = useRules()
const usersCrud = useUsersCrud()

const formIsValid = ref(false)

if (!authStore.databaseUser || !authStore.authUser) {
  throw new Error('Unauthenticated')
}

const formPayload = ref({
  name: authStore.databaseUser.name,
  email: authStore.authUser.email,
})

const loadingUpdateProfileData = ref(false)

async function handleUpdateProfileData() {
  try {
    loadingUpdateProfileData.value = true

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
    loadingUpdateProfileData.value = false
  }
}

const loadingSignOut = ref(false)

async function handleSignOut() {
  try {
    loadingSignOut.value = true

    const auth = getAuth()

    await signOut(auth)

    window.location.reload()
  } catch (err) {
    globalErrorHandler(err)
  } finally {
    loadingSignOut.value = false
  }
}
</script>

<style lang="scss" scoped>
.profilePhotoAvatar {
  border: 3px solid #000;
}
</style>
