<template>
  <div class="defaultPageContainer profilePageContainer">
    <h1 class="mb-4">
      Perfil
    </h1>

    <section>
      <h2 class="mb-4">
        Dados pessoais
      </h2>

      <p class="mb-4">
        Aqui você pode atualizar seus dados pessoais.
      </p>

      <v-form
        v-model="updateProfileDataFormIsValid"
        @submit.prevent="handleUpdateProfileData()"
      >
        <v-text-field
          v-model="updateProfileFormPayload.name"
          :rules="[formRules.requiredString]"
          :disabled="somethingIsLoading"
          label="Nome"
          variant="solo"
          rounded
          flat
        />

        <v-text-field
          v-model="updateProfileFormPayload.dateOfBirth"
          :rules="[formRules.requiredString]"
          :disabled="somethingIsLoading"
          :max="getMaxInputDate()"
          :min="getMinInputDate()"
          label="Data de nascimento"
          variant="solo"
          type="date"
          rounded
          flat
        />

        <v-text-field
          v-model="updateProfileFormPayload.email"
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
    </section>

    <section>
      <h2 class="mb-4">
        Métodos de login
      </h2>

      <p class="mb-4">
        Aqui você pode ver os métodos de autenticação habilitados para a sua conta.
      </p>

      <div
        v-if="authStore.authUser?.providerData"
        class="d-flex align-center justify-start ga-3"
        role="list"
      >
        <div
          v-for="(providerId, providerIndex) in activeAuthProviders"
          :key="`providerIndex${providerIndex}`"
          role="listitem"
        >
          <v-avatar
            color="card"
            size="60"
          >
            <v-icon size="30">
              {{ providerIcons[providerId as keyof typeof providerIcons] }}
            </v-icon>
          </v-avatar>
        </div>

        <div
          v-if="activeAuthProviders.length < 2"
          role="listitem"
        >
          <commons-generic-dialog>
            <template #title>
              Adicionar método de login
            </template>

            <template #text>
              <p class="mb-4">
                Aqui você pode adicionar novos métodos de login para a sua conta.
              </p>

              <v-alert
                v-if="activeAuthProviders.length === 2"
                type="success"
                variant="tonal"
              >
                Todos os provedores disponíveis já estão adicionados.
              </v-alert>

              <v-form
                ref="addProviderFormRef"
              >
                <div v-if="!activeAuthProviders.includes('password')">
                  <forms-password-text-field
                    v-model="addProviderFormPayload.password"
                    :rules="[formRules.requiredString, formRules.strongPassword]"
                    label="Informar senha de login com e-mail"
                  />

                  <forms-password-text-field
                    v-model="addProviderFormPayload.confirmPassword"
                    :rules="[(confirmPassword: unknown) => formRules.matchingPasswords(addProviderFormPayload.password, confirmPassword)]"
                    label="Confirme a nova senha"
                  />

                  <v-btn
                    :loading="addProviderLoading.email"
                    :disabled="somethingIsLoadingInProviderLink && !addProviderLoading.email"
                    color="primary"
                    size="x-large"
                    variant="flat"
                    class="mb-4"
                    rounded
                    block
                    @click="addEmailProvider()"
                  >
                    Identifique-se com e-mail e senha
                  </v-btn>
                </div>

                <div v-if="!activeAuthProviders.includes('google.com')">
                  <v-btn
                    :loading="addProviderLoading.google"
                    :disabled="somethingIsLoadingInProviderLink && !addProviderLoading.google"
                    color="secondary"
                    size="x-large"
                    variant="outlined"
                    rounded
                    block
                    @click="addGoogleProvider()"
                  >
                    <template #prepend>
                      <v-img
                        :src="googleLogo"
                        width="27px"
                        height="27px"
                      />
                    </template>

                    Identifique-se com o Google
                  </v-btn>
                </div>
              </v-form>
            </template>

            <template #activator="{ props }">
              <v-btn
                v-if="activeAuthProviders.length < 2"
                color="secondary"
                icon="mdi-plus"
                size="60"
                flat
                v-bind="props"
              >
                <v-icon size="30">
                  mdi-plus
                </v-icon>
              </v-btn>
            </template>
          </commons-generic-dialog>
        </div>
      </div>
    </section>

    <section>
      <h2 class="mb-4">
        Acesso
      </h2>

      <p class="mb-4">
        Precisa ir embora? Ficaremos te esperando!
      </p>

      <commons-confirm-dialog
        :confirm="authStore.handleSignOut"
      >
        <template #title>
          Sair
        </template>

        <template #text>
          Deseja realmente sair da plataforma?
        </template>

        <template #activator="{ props: activatorProps }">
          <v-btn
            :block="vuetifyDisplay.smAndDown.value"
            color="black"
            size="large"
            width="300px"
            prepend-icon="mdi-logout"
            rounded
            flat
            v-bind="activatorProps"
          >
            Sair
          </v-btn>
        </template>
      </commons-confirm-dialog>
    </section>

    <section>
      <h2 class="mb-4">
        Exclusão de conta e dados
      </h2>

      <p class="mb-4">
        Deseja excluir sua conta? Tudo bem, sentiremos sua falta!
      </p>

      <commons-confirm-dialog
        :confirm="handleDeleteAccount"
        :disable-confirm="!isRecentLogin"
        dangerous
      >
        <template #title>
          Excluir conta e dados
        </template>

        <template #text="{ loadingConfirm }">
          <p class="mb-4">
            Atenção: Sua conta e dados serão excluídos da plataforma permanentemente e não será possível recuperá-los.
          </p>

          <v-alert
            v-if="isRecentLogin"
            type="success"
            variant="tonal"
          >
            Usuário identificado! Clique em "Continuar" para prosseguir.
          </v-alert>

          <v-form
            v-else
            ref="deleteAccountFormRef"
            :disabled="loadingConfirm"
          >
            <p class="mb-4">
              Para continuar confirme sua identidade escolhendo uma das opções abaixo:
            </p>

            <div v-if="activeAuthProviders.includes('password')">
              <forms-password-text-field
                v-model="deleteAccountFormPayload.password"
                :rules="[formRules.requiredString]"
                label="Informar senha de login com e-mail"
              />

              <v-btn
                :loading="deleteAccountLoading.reauthenticateWithEmail"
                :disabled="somethingIsLoadingInDeleteAccount && !deleteAccountLoading.reauthenticateWithEmail"
                color="primary"
                size="x-large"
                variant="flat"
                class="mb-4"
                rounded
                block
                @click="reauthenticateWithEmail()"
              >
                Identifique-se com e-mail e senha
              </v-btn>
            </div>

            <div v-if="activeAuthProviders.includes('google.com')">
              <v-btn
                :loading="deleteAccountLoading.reauthenticateWithGoogle"
                :disabled="somethingIsLoadingInDeleteAccount && !deleteAccountLoading.reauthenticateWithGoogle"
                color="secondary"
                size="x-large"
                variant="outlined"
                rounded
                block
                @click="reauthenticateWithGoogle()"
              >
                <template #prepend>
                  <v-img
                    :src="googleLogo"
                    width="27px"
                    height="27px"
                  />
                </template>

                Identifique-se com o Google
              </v-btn>
            </div>
          </v-form>
        </template>

        <template #activator="{ props: activatorProps }">
          <v-btn
            :block="vuetifyDisplay.smAndDown.value"
            color="error"
            size="large"
            width="300px"
            prepend-icon="mdi-delete"
            rounded
            flat
            v-bind="activatorProps"
          >
            Excluir conta
          </v-btn>
        </template>
      </commons-confirm-dialog>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { EmailAuthProvider, getAuth, GoogleAuthProvider, linkWithCredential, linkWithPopup, reauthenticateWithCredential, reauthenticateWithPopup, sendEmailVerification } from 'firebase/auth'

import googleLogo from '@/assets/images/logos/googleLogo.svg'

definePageMeta({
  middleware: 'authenticated',
})

const authStore = useAuthStore()
const formRules = useRules()
const usersCrud = useUsersCrud()

const vuetifyDisplay = useDisplay()

const isRecentLogin = ref(false)

const providerIcons = {
  'google.com': 'mdi-google',
  'password': 'mdi-email',
}

if (!authStore.databaseUser || !authStore.authUser || !authStore.privateProfileData) {
  throw new Error('Unauthenticated')
}

const activeAuthProviders = computed(() => authStore.authUser?.providerData.map(item => item.providerId) ?? [])

const updateProfileDataFormIsValid = ref(false)

const updateProfileFormPayload = ref({
  name: authStore.databaseUser.name,
  dateOfBirth: authStore.privateProfileData.dateOfBirth,
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

    if (!authStore.databaseUser || !authStore.privateProfileData) {
      throw new Error('Unauthenticated')
    }

    const baseUpdateResult = await usersCrud.update({
      ...authStore.databaseUser,
      name: updateProfileFormPayload.value.name,
    })

    const privateDataUpdateResult = await usersCrud.updatePrivateProfileData(authStore.databaseUser.id, {
      ...authStore.privateProfileData,

      dateOfBirth: updateProfileFormPayload.value.dateOfBirth,
    })

    authStore.setDatabaseUser(baseUpdateResult as DatabaseUser)
    authStore.setPrivateProfileData(privateDataUpdateResult as DatabaseUserPrivateData)
  } catch (err) {
    globalErrorHandler(err)
  } finally {
    loading.value.updateProfileData = false
  }
}

// Add new auth provider

const addProviderFormRef = useTemplateRef('addProviderFormRef')

const addProviderFormPayload = ref({
  password: '',
  confirmPassword: '',
})

const addProviderLoading = ref({
  email: false,
  google: false,
})

const somethingIsLoadingInProviderLink = computed(() => Object.values(addProviderLoading.value).some(item => item === true))

async function addEmailProvider() {
  try {
    addProviderLoading.value.email = true

    const validationResult = await addProviderFormRef.value?.validate()

    if (validationResult?.valid) {
      const credential = EmailAuthProvider.credential(
        authStore.privateProfileData?.email ?? '',
        addProviderFormPayload.value.password,
      )

      const auth = getAuth()

      if (auth.currentUser) {
        await linkWithCredential(auth.currentUser, credential)

        await sendEmailVerification(auth.currentUser)

        window.location.reload()
      }
    }
  } catch (err) {
    globalErrorHandler(err)
  } finally {
    addProviderLoading.value.email = false
  }
}
async function addGoogleProvider() {
  try {
    addProviderLoading.value.google = true

    const googleAuthProvider = new GoogleAuthProvider()

    googleAuthProvider.setCustomParameters({
      prompt: 'select_account',
    })

    const auth = getAuth()

    if (auth.currentUser) {
      await linkWithPopup(auth.currentUser, googleAuthProvider)

      window.location.reload()
    }
  } catch (err) {
    globalErrorHandler(err)
  } finally {
    addProviderLoading.value.google = false
  }
}

// Delete account

const deleteAccountFormRef = useTemplateRef('deleteAccountFormRef')

const deleteAccountFormPayload = ref({
  password: '',
})

const deleteAccountLoading = ref({
  reauthenticateWithEmail: false,
  reauthenticateWithGoogle: false,
})

const somethingIsLoadingInDeleteAccount = computed(() => Object.values(deleteAccountLoading.value).some(item => item === true))

async function reauthenticateWithEmail() {
  try {
    deleteAccountLoading.value.reauthenticateWithEmail = true

    const validationResult = await deleteAccountFormRef.value?.validate()

    if (validationResult?.valid) {
      const credential = EmailAuthProvider.credential(
        authStore.authUser?.email ?? '',
        deleteAccountFormPayload.value.password,
      )

      const auth = getAuth()

      if (auth.currentUser) {
        await reauthenticateWithCredential(auth.currentUser, credential)

        isRecentLogin.value = true
      }
    }
  } catch (err) {
    globalErrorHandler(err)
  } finally {
    deleteAccountLoading.value.reauthenticateWithEmail = false
  }
}

async function reauthenticateWithGoogle() {
  try {
    deleteAccountLoading.value.reauthenticateWithGoogle = true

    const googleAuthProvider = new GoogleAuthProvider()

    googleAuthProvider.setCustomParameters({
      prompt: 'select_account',
    })

    const auth = getAuth()

    if (auth.currentUser) {
      await reauthenticateWithPopup(auth.currentUser, googleAuthProvider)

      isRecentLogin.value = true
    }
  } catch (err) {
    globalErrorHandler(err)
  } finally {
    deleteAccountLoading.value.reauthenticateWithGoogle = false
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

.profilePageContainer {
  section {
    margin-bottom: 50px;
  }
}
</style>
