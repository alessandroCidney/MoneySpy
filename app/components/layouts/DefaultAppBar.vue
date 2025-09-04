<template>
  <v-app-bar
    :elevation="0"
    :height="72"
    absolute
  >
    <template #append>
      <div class="notificationsArea">
        <v-btn
          color="neutral"
          icon="mdi-bell-outline"
          variant="tonal"
        />
      </div>

      <div
        v-if="authStore.authUser && authStore.databaseUser"
        class="userAvatarCard px-4 d-flex align-center justify-center ga-2"
      >
        <commons-user-avatar size="45" />

        <div>
          <div class="font-weight-medium userDisplayNameText">
            {{ authStore.databaseUser.name }}
          </div>

          <div class="text-medium-emphasis userEmailText">
            {{ authStore.authUser.email }}
          </div>
        </div>
      </div>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
</script>

<style lang="scss" scoped>
.userAvatarCard {
  .userEmailText {
    font-size: .9rem;
  }
}
</style>
