<template>
  <svg
    width="220"
    height="220"
    viewBox="0 0 220 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      :fill="colors[2]"
      x="1.5"
      y="1.5"
      width="197"
      height="197"
      rx="48.5"
      stroke="black"
      stroke-width="3"
    />
    <rect
      :fill="colors[1]"
      x="31.5"
      y="31.5"
      width="177"
      height="177"
      rx="48.5"
      stroke="black"
      stroke-width="3"
    />
    <rect
      :fill="colors[0]"
      x="61.5"
      y="61.5"
      width="157"
      height="157"
      rx="48.5"
      stroke="black"
      stroke-width="3"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  colors: { type: Array as PropType<string[]>, required: true },
})
</script>
