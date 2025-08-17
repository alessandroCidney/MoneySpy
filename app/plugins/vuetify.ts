import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    theme: {
      defaultTheme: 'customTheme',

      themes: {
        customTheme: {
          dark: false,

          colors: {
            primary: '#48EAA4',
          },
        },
      },
    },
  })

  app.vueApp.use(vuetify)
})
