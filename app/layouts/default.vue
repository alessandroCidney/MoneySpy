<template>
  <v-app>
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
</script>
