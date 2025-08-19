<template>
  <layouts-loading-container>
    <v-app>
      <layouts-default-app-bar />

      <layouts-default-sidebar />

      <v-main>
        <slot />
      </v-main>
    </v-app>
  </layouts-loading-container>
</template>
