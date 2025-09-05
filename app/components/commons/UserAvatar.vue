<template>
  <v-avatar
    :color="selectedProfilePhoto.type === 'icon' ? '#333' : undefined"
    :size="size"
  >
    <v-icon
      v-if="selectedProfilePhoto.type === 'icon'"
      :size="iconSize"
    >
      {{ selectedProfilePhoto.value }}
    </v-icon>

    <v-img
      v-else-if="selectedProfilePhotoUrl"
      :src="selectedProfilePhotoUrl"
      referrerpolicy="no-referrer"
      cover
    />
  </v-avatar>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const props = defineProps({
  size: { type: String, required: true },

  profilePhoto: { type: Object as PropType<DatabaseUser['profilePhoto']>, default: undefined },
})

const selectedProfilePhoto = computed(() => props.profilePhoto ?? authStore.userProfilePhoto)

const selectedProfilePhotoUrl = computed(() => {
  // The URL should not be saved in the profile photo object.
  // The "providerPhoto" type signals that it is necessary to fetch the "photoURL" from the "authUser"
  const isProviderPhoto = selectedProfilePhoto.value.type === 'providerPhoto'

  const isGooglePhoto = selectedProfilePhoto.value.value === 'google.com'
    && authStore.authUser?.photoURL
    && isGoogleProfilePhoto(authStore.authUser.photoURL)

  if (isProviderPhoto) {
    if (isGooglePhoto) {
      return increaseGoogleProfilePhotoSize(authStore.authUser?.photoURL ?? '', parseInt(props.size))
    }

    return authStore.authUser?.photoURL
  }

  return selectedProfilePhoto.value.url
})

const iconSize = computed(() => Math.floor(parseInt(props.size) * 0.9))
</script>
