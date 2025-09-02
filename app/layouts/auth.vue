<template>
  <layouts-loading-container>
    <v-app>
      <v-main>
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
            />
          </div>

          <div
            class="w-md-50 w-100 h-100"
          >
            <slot />
          </div>
        </div>
      </v-main>
    </v-app>
  </layouts-loading-container>
</template>

<script setup lang="ts">
import chartsAndCalcsImagePath from '@/assets/images/illustrations/chartsAndCalcs.png'
</script>

<style lang="scss">
.loginPageContainer {
  height: 100dvh;
  padding: 1%;

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
