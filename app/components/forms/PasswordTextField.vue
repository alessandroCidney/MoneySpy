<template>
  <v-text-field
    :type="showPassword ? 'text' : 'password'"
    v-bind="$attrs"
  >
    <template #append-inner>
      <v-btn
        :icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        color="secondary"
        variant="text"
        @click="showPassword = !showPassword"
      />
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
const showPassword = ref(false)
</script>
