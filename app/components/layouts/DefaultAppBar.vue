<template>
  <v-app-bar
    :elevation="0"
    :height="72"
    :absolute="vuetifyDisplay.lgAndUp.value"
  >
    <template
      v-if="vuetifyDisplay.mdAndDown.value"
      #prepend
    >
      <v-img
        src="@/assets/images/logos/largeAppLogo.png"
        width="170px"
        class="mx-4"
      />
    </template>

    <template #append>
      <div class="notificationsArea">
        <v-menu
          :model-value="notificationsStore.menuIsOpen"
          max-height="500px"
          @update:model-value="notificationsStore.setMenuIsOpen"
        >
          <template #activator="{ props }">
            <v-btn
              color="neutral"
              icon="mdi-bell-outline"
              variant="tonal"
              v-bind="props"
            >
              <v-badge
                :model-value="notificationsStore.unreadNotifications.length > 0"
                :content="notificationsStore.unreadNotifications.length"
                color="primary"
              >
                <v-icon>
                  mdi-bell-outline
                </v-icon>
              </v-badge>
            </v-btn>
          </template>

          <v-card class="pb-2">
            <template #title>
              Notificações
            </template>

            <template #text>
              <v-list
                v-if="notificationsStore.items.length"
                class="py-0"
              >
                <v-list-item
                  v-for="(notificationsData, notificationIndex) in notificationsStore.items"
                  :key="`notificationIndex${notificationIndex}`"
                  :to="notificationsData.to"
                  :active="false"
                  class="py-4"
                >
                  <template #prepend>
                    <v-icon>
                      {{ notificationsData.icon }}
                    </v-icon>
                  </template>

                  <template #title>
                    {{ notificationsData.text }}
                  </template>
                </v-list-item>
              </v-list>

              <div
                v-else
                class="text-center"
              >
                Nenhuma notificação até o momento.
              </div>
            </template>
          </v-card>
        </v-menu>
      </div>

      <div
        v-if="authStore.authUser && authStore.databaseUser"
        class="userAvatarCard px-4 d-flex align-center justify-center ga-2"
      >
        <commons-user-avatar size="45" />

        <div v-if="vuetifyDisplay.mdAndUp.value">
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
import { useDisplay } from 'vuetify'

const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const vuetifyDisplay = useDisplay()
</script>

<style lang="scss" scoped>
.userAvatarCard {
  .userEmailText {
    font-size: .9rem;
  }
}
</style>
