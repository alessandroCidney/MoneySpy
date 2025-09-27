<template>
  <v-img
    :src="imagePath"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import _ from 'lodash'

const props = defineProps({
  basePath: { type: String, required: true },
  filename: { type: String, required: true },
})

const localStorageHandler = useLocalStorage()

const themePrefix = computed(() => _.kebabCase(localStorageHandler.selectedThemeId.value))

const imagePath = computed(() => `${props.basePath}/${themePrefix.value}-${props.filename}`)
</script>
