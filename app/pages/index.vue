<template>
  <v-container>
    <div>Página inicial</div>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'unauthenticated',

  layout: 'clear',
})

const router = useRouter()

router.push({ name: 'home' })
</script>
