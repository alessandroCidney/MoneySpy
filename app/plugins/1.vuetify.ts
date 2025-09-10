import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import { defaultLightTheme, defaultDarkTheme, lovingTheme } from '@/utils/themes'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    ssr: false,

    theme: {
      defaultTheme: 'defaultLightTheme',

      themes: {
        defaultLightTheme,
        defaultDarkTheme,
        lovingTheme,
      },
    },
  })

  app.vueApp.use(vuetify)
})
