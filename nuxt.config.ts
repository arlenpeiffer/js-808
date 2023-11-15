// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'icon', href: 'https://fav.farm/🥁' },
        { rel: 'stylesheet', href: 'https://fonts.cdnfonts.com/css/pbio' }
      ],
      title: 'JS-808-A'
    }
  },
  css: ['@unocss/reset/tailwind.css'],
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@vueuse/nuxt']
})
