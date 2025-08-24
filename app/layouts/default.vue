<template>
  <layouts-loading-container>
    <v-app>
      <layouts-default-sidebar />

      <layouts-default-app-bar />

      <v-main>
        <slot />
      </v-main>
    </v-app>
  </layouts-loading-container>
</template>
