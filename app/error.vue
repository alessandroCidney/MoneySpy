<template>
  <div>
    Error, potato ships, lol
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object,
  required: true,
})

const handleError = () => clearError({ redirect: '/' })
</script>
