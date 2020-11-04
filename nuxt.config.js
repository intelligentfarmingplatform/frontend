import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'

export default {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Intelligent Farming Platform',
    script: [{ src: 'https://js.stripe.com/v3' }],
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/vars.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vuetify',
    '~/plugins/vuesax',
    { src: '~/plugins/vuex-persist', ssr: false },
    // { src: '~plugins/vue-scrollmagic.js', ssr: false },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // ['nuxt-stripe-module', {
    //   publishableKey: 'pk_test_51Hg9lmAFMKlS8CSVt1AbCsoCYIz3CFIrcV0tddZirj0H7rnBHxqwv8eOIYDBoygBUTlCdg4axOMnZsLSD6tmXlro009D4jrTF4',
    // }],
  ],
  bootstrapVue: {
    icons: false,
  },

  buildModules: [
    // Simple usage
    //'@nuxtjs/vuetify',
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    credentials: true,
  },
  auth: {
    localStorage: false,
    cookie: {
      options: {
        expires: 7,
      },
    },
    redirect: {
      login: '/',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'https://it-ifp-auth.herokuapp.com/api/user/login',
            method: 'post',
            propertyName: 'auth-token',
          },
          logout: false,
          user: {
            url: 'https://it-ifp-auth.herokuapp.com/api/me',
            method: 'get',
            propertyName: 'users',
          },
        },
        tokenType: '',
      },
    },
  },
  build: {
    extractCSS: true,
    babel: { compact: true },
  },
  /*
   ** Build configuration
   */
}
