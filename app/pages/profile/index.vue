<template>
  <div>
    Meu perfil

    {{ authStore.databaseUser }}
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
</script>
