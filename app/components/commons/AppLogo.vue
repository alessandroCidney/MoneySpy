<template>
  <v-img
    :src="vuetifyTheme.current.value.dark ? largeAppLogoWhiteSvg : largeAppLogoBlackSvg"
  />
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

import largeAppLogoWhiteSvg from '@/assets/images/logos/largeAppLogoWhite.svg'
import largeAppLogoBlackSvg from '@/assets/images/logos/largeAppLogoBlack.svg'

const vuetifyTheme = useTheme()
</script>
