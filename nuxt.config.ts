// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules:[
   
    '@nuxtjs/tailwindcss', 'shadcn-nuxt', '@vee-validate/nuxt', 'nuxt-toast'
  ],
  components:[{
      path: '~/components',
      extensions: ['.vue'], // Only import .vue files as components
    },],
  devtools: { enabled: true },
   shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

   
})