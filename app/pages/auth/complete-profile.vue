<template>
  <div
    v-if="loading"
    class="h-100 w-100 d-flex align-center justify-center"
  >
    <v-progress-circular
      color="primary"
      size="250"
      width="10"
      indeterminate
    />
  </div>

  <div
    v-else
    class="completeProfilePage"
  >
    <section
      class="completeProfileContent"
    >
      <h1 class="giantTitle mb-3">
        Complete seu perfil!
      </h1>

      <v-form
        ref="completeProfileFormRef"
        class="completeProfileForm"
        @submit.prevent="handleSave()"
      >
        <div class="text-center mb-8">
          <h3 class="mb-2 text-neutral">
            Avatar
          </h3>

          <v-avatar
            class="selectedAvatar"
            color="primary"
            size="200"
          >
            <v-icon size="150">
              {{ formPayload.profilePhoto?.value }}
            </v-icon>
          </v-avatar>
        </div>

        <v-text-field
          v-model="formPayload.name"
          :rules="[formRules.requiredString]"
          label="Qual o seu nome?"
          variant="solo-filled"
          rounded
          flat
        />

        <v-text-field
          v-model="formPayload.dateOfBirth"
          :rules="[formRules.requiredString]"
          :max="getMaxInputDate()"
          :min="getMinInputDate()"
          label="Quando você nasceu?"
          variant="solo-filled"
          type="date"
          rounded
          flat
        />

        <div class="bg-container avatarsList">
          <div
            role="list"
          >
            <div
              v-for="(iconData, iconIndex) in iconAvatarsList"
              :key="`iconIndex${iconIndex}`"
              role="listitem"
            >
              <v-btn
                :color="iconData.value === formPayload.profilePhoto?.value ? 'primary' : 'line'"
                variant="tonal"
                size="100"
                icon
                flat
                @click="formPayload.profilePhoto = iconData"
              >
                <v-icon
                  size="70"
                  color="text"
                >
                  {{ iconData.value }}
                </v-icon>
              </v-btn>
            </div>
          </div>
        </div>

        <div class="text-center">
          <v-btn
            color="primary"
            size="x-large"
            class="mt-7"
            append-icon="mdi-arrow-right"
            variant="flat"
            rounded
            type="submit"
          >
            Salvar e continuar
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

const formRules = useRules()

const completeProfileFormRef = useTemplateRef('completeProfileFormRef')

interface ProfilePhoto {
  type: 'icon'
  value: string
}

interface FormPayload {
  name: string

  profilePhoto: ProfilePhoto

  dateOfBirth: string
}

const formPayload = ref<FormPayload>({
  name: authStore.authUser?.displayName ?? '',

  profilePhoto: {
    type: 'icon',
    value: 'mdi-emoticon',
  },

  dateOfBirth: '',
})

const loading = ref(false)

async function handleSave() {
  try {
    loading.value = true

    if (!authStore.databaseUser || !authStore.privateProfileData) {
      throw new Error('Unauthenticated')
    }

    const validationResult = await completeProfileFormRef.value?.validate()

    if (validationResult?.valid) {
      const validatedFormPayload = formPayload.value as FormPayload

      await usersCrud.update({
        ...authStore.databaseUser,

        name: validatedFormPayload.name,
        profilePhoto: validatedFormPayload.profilePhoto,
      })

      await usersCrud.updatePrivateProfileData(authStore.databaseUser.id, {
        ...authStore.privateProfileData,

        dateOfBirth: validatedFormPayload.dateOfBirth,
      })

      window.location.reload()

      await wait(3000)
    } else {
      globalErrorHandler(new Error('Dados inválidos'))
    }
  } catch (err) {
    globalErrorHandler(err)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.completeProfilePage {
  position: relative;

  top: 80px;
  left: 50%;
  transform: translateX(-50%);

  .completeProfileContent {
    .giantTitle {
      font-size: 2rem;
      font-weight: bold !important;

      text-align: center;
    }

    .completeProfileForm {
      margin: auto;

      width: 900px;
      max-width: 90%;

      .selectedAvatar {
        border: 5px solid rgb(var(--v-theme-text));
      }

      .avatarsList {
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 20px;

        padding: 20px;

        border-radius: 50px;
      }
    }
  }
}
</style>
