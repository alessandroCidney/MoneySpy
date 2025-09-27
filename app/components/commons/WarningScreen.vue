<template>
  <section class="w-100 d-flex align-center justify-center flex-column flex-fill py-10 text-center">
    <div class="w-100">
      <slot name="image" />
    </div>

    <slot name="title">
      <h1>
        {{ title }}
      </h1>
    </slot>

    <slot name="description">
      <p class="text-disabled font-weight-medium">
        {{ description }}
      </p>
    </slot>

    <div>
      <slot name="actions" />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, required: false },
  description: { type: String, required: false },
})
</script>

<style lang="scss" scoped>

</style>
