const { theme } = require('./tailwind.config')

const meta = {
  title: 'Brewster',
  description: '',
  url: '',
  image: ''
}

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: meta.title,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 'http-equiv': 'x-ua-compatible', content: 'ie=edge,chrome=1' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', hid: 'og:title', content: meta.title },
        { property: 'og:url', hid: 'og:url', content: meta.url },
        {
          property: 'og:description',
          hid: 'og:description',
          content: meta.description
        },
        // Generic
        { property: 'image', hid: 'image', content: meta.image },
        { property: 'og:image', hid: 'og:image', content: meta.image },
        {
          hid: 'description',
          name: 'description',
          content: meta.description
        }
        // { name: 'theme-color', content: theme.extend.colors['red-500'] }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        { rel: 'canonical', href: meta.url },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto+Condensed:wght@700&family=Roboto+Slab:wght@700&display=swap'
        }
      ]
    }
  },
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dhwtxeo2c/image/fetch/brewster/'
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxt/image-edge',
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    classSuffix: ''
  }
})
