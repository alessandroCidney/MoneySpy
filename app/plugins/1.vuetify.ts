import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import { lightTheme, darkTheme, lovingTheme } from '@/utils/themes'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    ssr: false,

    theme: {
      defaultTheme: 'lightTheme',

      themes: {
        lightTheme,
        darkTheme,
        lovingTheme,
      },
    },
  })

  app.vueApp.use(vuetify)
})
