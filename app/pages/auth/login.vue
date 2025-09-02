<template>
  <div class="d-flex loginPageContainer">
    <div
      class="d-md-block d-none w-md-50 h-100"
    >
      <div
        class="w-100 h-100 ultraRounded overflow-hidden"
        :style="{
          backgroundImage: `url(${chartsAndCalcsImagePath})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }"
      >
        <!-- <div
          :style="{
            width: 'calc(100% - 20)',
            height: '300px',
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgb(255, 255, 255, .5)',
            border: '1px solid white',
          }"
          class="ma-5 rounded-xl overflow-hidden"
        /> -->
      </div>
    </div>

    <div
      class="w-md-50 w-100 h-100 d-flex align-center justify-center"
    >
      <div class="px-5">
        <h1 class="font-weight-bold text-center">
          Criar nova conta
        </h1>

        <p class="mb-10 text-center">
          Crie uma nova conta para aproveitar todas as funcionalidades da plataforma!
        </p>

        <v-form>
          <v-text-field
            label="Seu nome"
            variant="solo-filled"
            flat
          />

          <v-text-field
            label="E-mail"
            variant="solo-filled"
            flat
          />

          <v-text-field
            label="Senha"
            variant="solo-filled"
            flat
          />

          <v-text-field
            label="Confirmar senha"
            variant="solo-filled"
            flat
          />

          <v-btn
            color="primary"
            size="x-large"
            variant="flat"
            class="mb-4"
            rounded
            block
          >
            Criar conta
          </v-btn>

          <v-btn
            color="secondary"
            size="x-large"
            variant="outlined"
            rounded
            block
          >
            <template #prepend>
              <v-img
                :src="googleLogo"
                width="27px"
                height="27px"
              />
            </template>

            Entrar com o Google
          </v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { deleteUser, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import chartsAndCalcsImagePath from '@/assets/images/illustrations/chartsAndCalcs.png'
import googleLogo from '@/assets/images/logos/googleLogo.svg'

definePageMeta({
  layout: 'clear',
})

const nuxtApp = useNuxtApp()

const googleProvider = new GoogleAuthProvider()

const usersCrud = useUsersCrud()

async function handleSignInWithGoogle() {
  try {
    const result = await signInWithPopup(nuxtApp.$firebaseAuth, googleProvider)

    await usersCrud.create(
      {
        id: result.user.uid,
        name: result.user.displayName || 'Name not found',

        active: true,
      }, {
        email: result.user.email,
      },
    )

    window.location.reload()
  } catch (err) {
    globalErrorHandler(err)
  }
}

async function removeMyUser() {
  try {
    if (nuxtApp.$firebaseAuth.currentUser?.uid) {
      await usersCrud.remove(nuxtApp.$firebaseAuth.currentUser?.uid)

      await deleteUser(nuxtApp.$firebaseAuth.currentUser)

      window.location.reload()
    }
  } catch (err) {
    globalErrorHandler(err)
  }
}
</script>

<style lang="scss" scoped>
.loginPageContainer {
  height: 100dvh;

  > div {
    padding: 1%;
  }

  h1 {
    font-size: 4rem;
  }
}

@media(max-width: 550px) {
  .loginPageContainer {
    h1 {
      font-size: 3rem;
    }
  }
}
</style>
