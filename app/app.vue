<template>
  <NuxtLayout>
    <NuxtPage />

    <layouts-app-message />
  </NuxtLayout>
</template>

<script setup lang="ts">
const routes = getRoutes()
const route = useRoute()

const baseTitle = ref('MoneySpy')

const currentRouteName = computed(() => routes.find(item => item.name === route.name)?.title)

const titlePrefix = computed(() => currentRouteName.value ? `${currentRouteName.value} - ` : '')

const titleStr = computed(() => `${titlePrefix.value}${baseTitle.value}`)

useHead({
  title: titleStr,
})
</script>
