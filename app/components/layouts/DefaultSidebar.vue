<template>
  <v-navigation-drawer
    v-model="sidebarsStore.defaultSidebarIsOpen"
    class="defaultSidebar"
    tag="div"
    floating
  >
    <div class="logoArea d-flex align-center justify-start ga-2 px-5">
      <v-img
        src="@/assets/images/logos/largeAppLogo.png"
        max-width="170px"
      />
    </div>

    <v-list
      class="sidebarList py-0"
      active-class="bg-secondary text-white"
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

<style lang="scss" scoped>
.defaultSidebar {
  .logoArea {
    height: 80px;
  }

  .sidebarList {
    background-color: rgb(var(--v-theme-gray-background)) !important;
    border-radius: 0 var(--ultra-rounded-border-radius) var(--ultra-rounded-border-radius) 0 !important;

    .v-list-item {
      height: 60px;
    }
  }
}
</style>
