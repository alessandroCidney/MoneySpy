<template>
  <v-snackbar
    :timeout="messageStore.messageData.timeout"
    :multi-line="messageStore.messageData.multiline"
    :model-value="messageStore.messageData.active"
    content-class="defaultAppMessage"
    :content-props="{
      style: {
        border: `2px solid ${formattedSnackbarColor}`,
      },
    }"
    color="root"
    location="bottom right"
    @update:model-value="messageStore.setMessageActive"
  >
    <v-icon
      :color="messageStore.messageData.color"
      size="30"
      class="mr-3"
    >
      {{ messageStore.messageData.icon }}
    </v-icon>

    <span class="textContent">
      {{ messageStore.messageData.text }}
    </span>

    <template #actions>
      <v-btn
        v-if="messageStore.messageData.action"
        variant="tonal"
        class="mr-2 px-4"
        size="large"
        ripple
        @click="messageStore.callAction()"
      >
        Ver detalhes
      </v-btn>

      <v-btn
        variant="tonal"
        class="mr-1"
        icon="mdi-close"
        ripple
        @click="messageStore.setMessageActive(false)"
      />
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
const messageStore = useMessagesStore()

const formattedSnackbarColor = computed(() => `rgb(var(--v-theme-${messageStore.messageData.color}))`)
</script>

<style lang="scss">
.defaultAppMessage {
  overflow: hidden;

  border-radius: 12px !important;

  .textContent {
    font-size: 1rem;
  }
}
</style>
