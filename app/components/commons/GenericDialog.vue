<template>
  <v-dialog
    v-model="isOpen"
    max-width="500"
  >
    <template #activator="{ props: activatorProps }">
      <slot
        :props="activatorProps"
        name="activator"
      />
    </template>

    <v-card>
      <template #title>
        <slot name="title" />
      </template>

      <template #text>
        <slot name="text" />
      </template>

      <v-card-actions>
        <v-btn
          size="large"
          color="primary"
          variant="flat"
          class="px-4"
          @click="isOpen = false"
        >
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const isOpen = ref(false)
</script>
