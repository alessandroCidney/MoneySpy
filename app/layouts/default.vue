<template>
  <layouts-loading-container>
    <v-app>
      <template v-if="vuetifyDisplay.md.value">
        <layouts-default-app-bar />
        <layouts-default-sidebar />
      </template>

      <template v-else>
        <layouts-default-sidebar />
        <layouts-default-app-bar />
      </template>

      <v-main>
        <slot />
      </v-main>
    </v-app>
  </layouts-loading-container>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const vuetifyDisplay = useDisplay()
</script>
