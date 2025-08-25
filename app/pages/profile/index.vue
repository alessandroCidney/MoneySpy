<template>
  <div class="bg-gray-background ultraRounded pa-8 my-2 mx-4 position-relative">
    <h1 class="mb-4">
      Perfil
    </h1>

    <section class="mb-8">
      <h2 class="mb-4">
        Foto de perfil
      </h2>

      <div class="profilePhotoSettings d-flex align-center ga-8">
        <v-avatar
          size="200"
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
            size="large"
            rounded
            flat
          >
            Atualizar foto
          </v-btn>

          <v-btn
            color="neutral"
            size="large"
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
        color="error"
        size="large"
        width="200px"
        rounded
        flat
      >
        Sair
      </v-btn>
    </section>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
</script>

<style lang="scss" scoped>
.profilePhotoAvatar {
  border: 3px solid #000;
}
</style>
