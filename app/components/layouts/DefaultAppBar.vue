<template>
  <v-app-bar
    :elevation="0"
  >
    <template #prepend>
      <v-btn
        icon="mdi-menu"
        @click="sidebarsStore.toggleDefaultSidebarIsOpen()"
      />
    </template>

    <v-app-bar-title>
      Minha Aplicação
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
const sidebarsStore = useSidebarsStore()
</script>
