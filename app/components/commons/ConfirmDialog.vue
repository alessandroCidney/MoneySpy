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
          :disabled="loadingConfirm"
          size="large"
          class="px-4"
          @click="handleCancel()"
        >
          Cancelar
        </v-btn>

        <v-btn
          :loading="loadingConfirm"
          size="large"
          :color="dangerous ? 'error' : 'primary'"
          variant="flat"
          class="px-4"
          @click="handleConfirm()"
        >
          Continuar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const loadingConfirm = ref(false)

const props = defineProps({
  confirm: { type: Function, required: true },
  cancel: { type: Function, default: () => {} },

  dangerous: Boolean,
})

async function handleConfirm() {
  try {
    loadingConfirm.value = true

    await props.confirm()

    isOpen.value = false
  } catch (err) {
    globalErrorHandler(err)
  } finally {
    loadingConfirm.value = false
  }
}

async function handleCancel() {
  try {
    await props.cancel()

    isOpen.value = false
  } catch (err) {
    globalErrorHandler(err)
  }
}
</script>
