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

        <v-form
          ref="formRef"
          v-model="formIsValid"
        >
          <slot
            :internal-payload="internalPayload"
            :form-rules="formRules"
            name="form"
          />
        </v-form>
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
          :disabled="!formIsValid"
          :loading="loadingConfirm"
          size="large"
          color="primary"
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
import _ from 'lodash'

const formRules = useRules()

const formRef = useTemplateRef('formRef')

const isOpen = ref(false)
const loadingConfirm = ref(false)
const formIsValid = ref(false)

const props = defineProps({
  confirm: { type: Function as PropType<(finalPayload: unknown) => unknown>, required: true },
  cancel: { type: Function, default: () => {} },

  basePayload: { type: Object, required: true },
})

const internalPayload = ref<typeof props.basePayload>({})

watch(isOpen, () => {
  internalPayload.value = _.cloneDeep(props.basePayload)
})

async function handleConfirm() {
  try {
    loadingConfirm.value = true

    const validationResult = await formRef.value?.validate()

    if (validationResult?.valid && internalPayload.value) {
      await props.confirm(internalPayload.value)
    }

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
