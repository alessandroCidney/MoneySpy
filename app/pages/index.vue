<template>
  <v-container>
    <div>Index</div>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'unauthenticated',

  layout: 'clear',
})
</script>
