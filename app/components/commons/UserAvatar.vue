<template>
  <div>
    <v-hover>
      <template #default="{ isHovering, props: hoverProps }">
        <v-avatar
          :color="isHovering ? 'primary' : '#333'"
          :size="size"
          class="position-relative cursor-pointer"
          v-bind="hoverProps"
        >
          <div
            v-if="loading"
            class="w-100 h-100 d-flex align-center justify-center"
          >
            <v-progress-circular
              width="3"
              size="30"
              indeterminate
            />
          </div>

          <v-icon
            v-else
            :size="iconSize"
          >
            {{ selectedProfilePhoto.value }}
          </v-icon>
        </v-avatar>
      </template>
    </v-hover>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const props = defineProps({
  size: { type: String, required: true },

  profilePhoto: { type: Object as PropType<DatabaseUser['profilePhoto']>, default: undefined },

  loading: Boolean,
})

const selectedProfilePhoto = computed(() => props.profilePhoto ?? authStore.userProfilePhoto)

const iconSize = computed(() => Math.floor(parseInt(props.size) * 0.75))
</script>
