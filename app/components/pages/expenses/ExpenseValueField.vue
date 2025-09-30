<template>
  <div>
    <v-btn-toggle
      v-model="selectedMode"
      :color="selectedMode === 'expense' ? 'secondary' : 'primary'"
      class="mb-4 ultraRounded"
      @update:model-value="handleUpdateSelectedMode"
    >
      <v-btn
        value="expense"
      >
        <v-icon start>
          mdi-minus-circle
        </v-icon>

        Despesa
      </v-btn>

      <v-btn
        value="income"
      >
        <v-icon start>
          mdi-plus-circle
        </v-icon>

        Entrada
      </v-btn>
    </v-btn-toggle>

    <forms-number-text-field
      :model-value="absValue"
      :rules="[formRules.requiredNumber, formRules.numberGreaterThanZero]"
      :step="0.05"
      :min="0"
      label="Valor"
      type="number"
      lang="pt"
      @update:model-value="handleUpdateNumber"
    />
  </div>
</template>

<script setup lang="ts">
const formRules = useRules()

const modelValue = defineModel<string | number>({ required: true })

const selectedMode = ref<'income' | 'expense'>(stringToNumber(modelValue.value) > 0 ? 'income' : 'expense')

const absValue = ref<string | number>(Math.abs(stringToNumber(modelValue.value)))

const emit = defineEmits(['update:mode'])

function handleUpdateNumber(newStrValue: string | number) {
  absValue.value = newStrValue

  if (isValidNumber(absValue.value) && stringToNumber(absValue.value) > 0) {
    const finalValue = selectedMode.value === 'income'
      ? stringToNumber(absValue.value)
      : stringToNumber(absValue.value) * (-1)

    modelValue.value = finalValue
  } else {
    modelValue.value = newStrValue
  }
}

function handleUpdateSelectedMode(newSelectedMode: 'income' | 'expense') {
  selectedMode.value = newSelectedMode

  handleUpdateNumber(absValue.value)

  emit('update:mode')
}
</script>
