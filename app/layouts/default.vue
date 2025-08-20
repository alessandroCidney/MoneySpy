<template>
  <layouts-loading-container>
    <v-app>
      <layouts-default-app-bar />

      <layouts-default-sidebar />

      <v-main class="d-flex align-center justify-center">
        <slot />
      </v-main>
    </v-app>
  </layouts-loading-container>
</template>
