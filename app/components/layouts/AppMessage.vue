<template>
  <v-snackbar
    :color="messageStore.messageData.color"
    :timeout="messageStore.messageData.timeout"
    :multi-line="messageStore.messageData.multiline"
    :model-value="messageStore.messageData.active"
    content-class="defaultAppMessage"
    @update:model-value="messageStore.setMessageActive"
  >
    <v-icon
      size="27"
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
</script>

<style lang="scss">
.defaultAppMessage {
  overflow: hidden;

  border-radius: 8px;

  .textContent {
    font-size: 1rem;
  }
}
</style>
