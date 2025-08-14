<template>
  <div>
    Teste
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()

console.log('test nuxt app', nuxtApp.$firebaseApp.name)
</script>
