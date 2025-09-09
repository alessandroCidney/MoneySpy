import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const defaultLightTheme = {
  dark: false,

  colors: {
    'primary': '#1ADB87',
    'secondary': '#000000',
    'root': '#FFFFFF',
    'container': '#f8f8f8',
    'card': '#FFFFFF',
    'neutral': '#424A52',
    'red': '#F44336',
    'deep-purple': '#673AB7',
  },
}

const defaultDarkTheme = {
  dark: true,

  colors: {
    'primary': '#1ADB87',
    'secondary': '#13A465',
    'root': '#212121',
    'container': '#333333',
    'card': '#3D3D3D',
    'neutral': '#f8f8f8',
    'red': '#F44336',
    'deep-purple': '#673AB7',
  },
}

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
