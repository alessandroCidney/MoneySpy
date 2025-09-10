import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import { defaultLightTheme, defaultDarkTheme } from '@/utils/themes'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    ssr: false,

    theme: {
      defaultTheme: 'defaultDarkTheme',

      themes: {
        defaultLightTheme,
        defaultDarkTheme,
      },
    },
  })

  app.vueApp.use(vuetify)
})
