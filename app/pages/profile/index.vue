<template>
  <div class="defaultPageContainer">
    <h1 class="mb-4">
      Perfil
    </h1>

    <section class="mb-8">
      <h2 class="mb-4">
        Foto de perfil
      </h2>

      <div class="profilePhotoSettings d-flex align-center ga-8">
        <v-avatar
          size="150"
          class="profilePhotoAvatar"
        >
          <v-img
            :src="authStore.validatedProfilePhoto"
            cover
          />
        </v-avatar>

        <div class="d-flex flex-column ga-3">
          <v-btn
            color="primary"
            rounded
            flat
          >
            Atualizar foto
          </v-btn>

          <v-btn
            color="neutral"
            rounded
            flat
          >
            Excluir foto
          </v-btn>
        </div>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="mb-4">
        Dados pessoais
      </h2>

      <v-form>
        <v-text-field
          label="Nome"
          variant="solo"
          rounded
          flat
        />

        <v-text-field
          label="E-mail"
          variant="solo"
          rounded
          flat
        />
      </v-form>
    </section>

    <section>
      <h2 class="mb-4">
        Acesso
      </h2>

      <v-btn
        :loading="loadingSignOut"
        color="error"
        size="large"
        width="200px"
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
