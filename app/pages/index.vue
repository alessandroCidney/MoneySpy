<template>
  <v-container />
</template>

<script setup lang="ts">
definePageMeta({
  middleware() {
    return navigateTo({ name: 'home' })
  },

  layout: 'clear',
})
</script>
