<template>
  <label
    :class="{
      commonAutoGrowInput: true,
      focused,
      filled: modelValue.length > 0,
    }"
  >
    <span>Qual o seu nome?</span>

    <input
      ref="giantInputRef"
      v-model="modelValue"
      type="text"
      @focus="focused = true"
      @blur="focused = false"
    >
  </label>
</template>

<script setup lang="ts">
const giantInputRef = useTemplateRef('giantInputRef')

const modelValue = defineModel<string>({ default: '' })

const focused = ref(false)

onMounted(() => {
  adjustInputWidth()
})

watch(modelValue, () => {
  adjustInputWidth()
})

function adjustInputWidth() {
  if (giantInputRef.value) {
    if (focused.value) {
      giantInputRef.value.style.width = modelValue.value.length ? `${modelValue.value.length}ch` : '1ch'
    } else {
      giantInputRef.value.style.width = modelValue.value.length ? `${modelValue.value.length}ch` : `${'Qual o seu nome?'.length}ch`
    }
  }
}
</script>

<style lang="scss" scoped>
.commonAutoGrowInput {
  font-size: 2rem;
  letter-spacing: 0;

  position: relative;

  * {
    text-align: center;
  }

  &.focused, &.filled {
    span {
      scale: 0.5;

      transform: translateY(-80px);
    }
  }

  span {
    display: block;
    position: absolute;

    width: 100%;

    transition: all .3s linear;

    font-weight: 500;
    color: #ccc;

    cursor: text;
  }

  input {
    min-width: 16ch;

    &:focus {
      outline: none;
    }
  }
}
</style>
