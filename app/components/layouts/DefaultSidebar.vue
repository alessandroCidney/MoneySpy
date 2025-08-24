<template>
  <v-navigation-drawer
    v-model="sidebarsStore.defaultSidebarIsOpen"
    tag="div"
    floating
  >
    <div class="d-flex align-center justify-start ga-2 pa-5">
      <v-img
        src="@/assets/images/logos/mainLogo.svg"
        :max-width="50"
        :min-width="50"
      />

      <h1>
        MyApp
      </h1>
    </div>

    <v-list
      tag="nav"
    >
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
