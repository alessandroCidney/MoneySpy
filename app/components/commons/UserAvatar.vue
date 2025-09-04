<template>
  <v-avatar
    :color="authStore.userProfilePhoto.type === 'icon' ? 'neutral' : undefined"
    :size="size"
  >
    <v-icon
      v-if="authStore.userProfilePhoto.type === 'icon'"
      :size="iconSize"
    >
      {{ authStore.userProfilePhoto.value }}
    </v-icon>

    <v-img
      v-else
      :src="authStore.userProfilePhoto.url"
      cover
    />
  </v-avatar>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const props = defineProps({
  size: { type: String, required: true },
})

const iconSize = computed(() => Math.floor(parseInt(props.size) * 0.9))
</script>
