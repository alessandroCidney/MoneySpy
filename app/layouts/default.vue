<template>
  <v-app v-if="authStore.authLoading">
    <v-container class="fill-height">
      <v-progress-circular
        class="mx-auto"
        color="primary"
        size="150"
        width="5"
        indeterminate
      />
    </v-container>
  </v-app>

  <v-app v-else>
    <v-navigation-drawer>
      <v-list>
        <v-list-item
          v-for="routeData in routes"
          :key="routeData.title"
          :to="routeData.path"
        >
          <template #prepend>
            <v-icon>
              {{ routeData.icon }}
            </v-icon>
          </template>

          <template #title>
            {{ routeData.title }}
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const routes = getRoutes()

const authStore = useAuthStore()
</script>
