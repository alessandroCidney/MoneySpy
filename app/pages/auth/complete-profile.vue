<template>
  <div class="w-100 h-100 d-flex align-center justify-center">
    <v-progress-circular
      v-if="loading"
      color="primary"
      size="250"
      width="10"
      indeterminate
    />

    <section
      v-else
      class="completeProfileContent"
    >
      <h1 class="giantTitle">
        Complete seu perfil!
      </h1>

      <v-form @submit.prevent="handleSave()">
        <div class="text-center mb-10">
          <commons-user-avatar
            :profile-photo="authStore.authUser?.photoURL ? { type: 'providerPhoto', value: 'google.com' } : undefined"
            size="300"
          />
        </div>

        <!-- <commons-upload-area
          v-model="formPayload.profilePhoto"
          class="profilePhotoUpload"
        >
          <template #label="{ hover, selectedFile }">
            <v-icon
              v-if="hover && !selectedFile"
              size="200"
            >
              mdi-image-plus
            </v-icon>

            <v-icon
              v-else-if="!selectedFile"
              size="250"
            >
              mdi-face-man
            </v-icon>
          </template>
        </commons-upload-area> -->

        <div class="d-flex align-center justify-center flex-column">
          <forms-auto-grow-input
            v-model="formPayload.name"
          />

          <v-btn
            :disabled="!formIsValid"
            color="primary"
            size="x-large"
            class="mt-10"
            append-icon="mdi-arrow-right"
            variant="flat"
            rounded
            type="submit"
          >
            Continuar
          </v-btn>
        </div>
      </v-form>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'authenticated',

  layout: 'clear',
})

const authStore = useAuthStore()
const usersCrud = useUsersCrud()

interface FormPayload {
  name: string
  profilePhoto: File
}

const formPayload = ref<Partial<FormPayload>>({
  name: authStore.authUser?.displayName ?? '',
  profilePhoto: undefined,
})

const formIsValid = computed(() => !!formPayload.value.name)

const loading = ref(false)

async function handleSave() {
  try {
    loading.value = true

    if (!authStore.databaseUser) {
      throw new Error('Unauthenticated')
    }

    const validatedFormPayload = formPayload.value as FormPayload

    const currentProviderData = authStore.authUser?.providerData[0]

    await usersCrud.update({
      ...authStore.databaseUser,
      name: validatedFormPayload.name,

      profilePhoto: currentProviderData?.photoURL
        ? {
            type: 'providerPhoto',
            value: currentProviderData?.providerId,
          }
        : {
            type: 'icon',
            value: 'mdi-face-man',
          },
    })

    window.location.reload()

    await wait(3000)
  } catch (err) {
    globalErrorHandler(err)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.completeProfileContent {
  .giantTitle {
    font-size: 4rem;
    font-weight: bold !important;

    margin-bottom: 20px;

    text-align: center;
  }

  // .profilePhotoUpload {
  //   width: 300px;
  //   height: 300px;

  //   border-radius: 50%;

  //   margin: 0 auto 50px auto;
  // }
}
</style>
