<template>
  <layouts-loading-container>
    <v-app>
      <v-app-bar
        :elevation="0"
        :height="72"
        absolute
      >
        <template #title>
          <v-img
            src="@/assets/images/logos/largeAppLogo.png"
            max-width="170px"
          />
        </template>

        <template #append>
          <v-btn
            prepend-icon="mdi-arrow-left"
            variant="tonal"
            class="mr-3"
            rounded
          >
            Sair
          </v-btn>
        </template>
      </v-app-bar>

      <v-main class="pt-0">
        <slot />
      </v-main>
    </v-app>
  </layouts-loading-container>
</template>
