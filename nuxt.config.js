import VuetifyLoaderPlugin from "vuetify-loader/lib/plugin";
import pkg from "./package";

export default {

  /*
   ** Headers of the page
   */
  head: {
    title: "Intelligent Farming Platform",
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: [ '~/assets/style/vars.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/vuetify", { src: "~/plugins/chartist", mode: "client" }],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth'
  ],

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
      login: '/Auth/login'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'https://it-ifp-auth.herokuapp.com/api/user/login',
            method: 'post',
            propertyName:'auth-token'
          },
          logout: {
            url: 'https://it-ifp-auth.herokuapp.com/api/users/logout',
            method: 'delete'
          },
          user: {
            url: 'https://it-ifp-auth.herokuapp.com/api/me',
            method: 'get',
            propertyName:''
          }
        },
        tokenType:''
      }
    }
  },
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {

    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
}
  /*
   ** Build configuration
   */

};
