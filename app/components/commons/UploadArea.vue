<template>
  <label class="commonUploadArea">
    <span class="baseText">
      <slot
        name="label"
        :hover="hover"
        :selected-file="selectedFile"
      >
        <template v-if="!selectedFile">
          Arraste um arquivo ou clique para selecionar
        </template>
      </slot>
    </span>

    <input
      type="file"
      accept=".jpg, .jpeg, .png"
      :class="{ disabled }"
      :disabled="disabled"
      @change="onFileUpload"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
  </label>
</template>

<script setup lang="ts">
defineProps({
  disabled: Boolean,
})

const hover = ref(false)

const selectedFile = defineModel<File>()
const selectedFileUrl = ref('')

function onFileUpload(event: Event) {
  if (event.target instanceof HTMLInputElement && event.target.files?.[0]) {
    selectedFile.value = event.target.files[0]

    if (selectedFile.value) {
      selectedFileUrl.value = `url('${URL.createObjectURL(selectedFile.value)}')`
    }
  }
}
</script>

<style lang="scss" scoped>
.commonUploadArea {
  display: block;
  position: relative;

  background-color: #333;
  background-image: v-bind(selectedFileUrl);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  text-align: center;

  padding: 0 20px;

  transition: 0.2s ease-in-out all;

  &:hover {
    filter: brightness(0.5);
  }

  .baseText {
    font-weight: 600;
  }

  .selectedFileText {
    font-size: .8rem;
  }

  input {
    position: absolute;

    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 100%;

    opacity: 0;

    &:not(.disabled) {
      cursor: pointer;
    }
  }
}
</style>
