<template>
  <v-navigation-drawer
    v-model="sidebarsStore.defaultSidebarIsOpen"
  >
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
</template>

<script setup lang="ts">
const sidebarsStore = useSidebarsStore()

const routes = getRoutes()
</script>
