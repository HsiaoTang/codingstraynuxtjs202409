// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/css/fonts.css'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  imports: { autoImport: false },
  typescript: { typeCheck: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'nuxt-svgo-loader',
    '@nuxt/image',
  ],
  i18n: {
    vueI18n: './i18n.config.ts',
  },
  runtimeConfig: {
    public: {
      keycloakUrl: process.env.KEYCLOAK_URL,
      keycloakRealm: process.env.KEYCLOAK_REALM,
      keycloakClientId: process.env.KEYCLOAK_CLIENT_ID,
    }
  },
})