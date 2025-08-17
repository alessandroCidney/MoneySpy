import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error - Vuetify documentation says this comment is required for the configuration to work correctly
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  devtools: { enabled: true },

  css: [
    '@/assets/scss/global.scss',
  ],

  runtimeConfig: {
    public: {
      API_KEY: process.env.API_KEY,
      AUTH_DOMAIN: process.env.AUTH_DOMAIN,
      PROJECT_ID: process.env.PROJECT_ID,
      STORAGE_BUCKET: process.env.STORAGE_BUCKET,
      MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
      APP_ID: process.env.APP_ID,
    },
  },

  build: {
    transpile: ['vuetify'],
  },

  compatibilityDate: '2025-07-15',

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  eslint: {
    config: {
      stylistic: {
        braceStyle: '1tbs',
        commaDangle: 'always-multiline',
      },
    },
  },
})
