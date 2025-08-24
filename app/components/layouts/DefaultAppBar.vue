<template>
  <v-app-bar
    :elevation="0"
    :height="72"
  >
    <template #append>
      <div class="notificationsArea">
        <v-btn
          color="neutral"
          icon="mdi-bell-outline"
          variant="tonal"
        />
      </div>

      <div class="userAvatarCard px-4 d-flex align-center justify-center ga-2">
        <v-avatar
          size="45"
        >
          <v-img
            :src="authStore.validatedAuthUser.photoURL || ''"
            cover
          />
        </v-avatar>

        <div>
          <div class="font-weight-medium userDisplayNameText">
            {{ authStore.validatedAuthUser.displayName }}
          </div>

          <div class="text-medium-emphasis userEmailText">
            {{ authStore.validatedAuthUser.email }}
          </div>
        </div>
      </div>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
const sidebarsStore = useSidebarsStore()

const authStore = useAuthStore()
</script>

<style lang="scss" scoped>
.userAvatarCard {
  .userEmailText {
    font-size: .9rem;
  }
}
</style>
