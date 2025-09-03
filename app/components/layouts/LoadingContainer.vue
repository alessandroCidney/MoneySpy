<template>
  <v-app v-if="authStore.loadingAuth">
    <v-container class="fill-height">
      <v-progress-circular
        class="mx-auto"
        color="primary"
        size="150"
        width="5"
        indeterminate
      />
    </v-container>
  </v-app>

  <slot v-else />
</template>

<script setup lang="ts">
const authStore = useAuthStore()
</script>
