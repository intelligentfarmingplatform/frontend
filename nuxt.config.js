import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'

export default {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Intelligent Farming Platform',
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
    // { src: '~plugins/vue-scrollmagic.js', ssr: false },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
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
    // See https://github.com/nuxt-community/axios-module#options
  },
  auth: {
    redirect: {
      login: '/Auth/login',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'https://it-ifp-auth.herokuapp.com/api/user/login',
            method: 'post',
            propertyName: 'auth-token',
          },
          logout: {
            url: 'https://it-ifp-auth.herokuapp.com/api/users/logout',
            method: 'delete',
          },
          user: {
            url: 'https://it-ifp-auth.herokuapp.com/api/me',
            method: 'get',
            propertyName: '',
          },
        },
        tokenType: '',
      },
    },
  },
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          exclude: /(node_modules)/,
        })
      }
      if (ctx.isClient) {
        config.devtool = 'source-map'
      }
    },
    transpile: [/^vuetify/],
    babel: { compact: true },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  /*
   ** Build configuration
   */
}
