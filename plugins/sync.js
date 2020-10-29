import { sync } from 'vuex-router-sync'
import store from './vuex/store' // vuex store instance
import router from './router' // vue-router instance
 
const unsync = sync(store, router) // done. Returns an unsync callback fn
 
// bootstrap your app...
 
// During app/Vue teardown (e.g., you only use Vue.js in a portion of your app and you 
// navigate away from that portion and want to release/destroy Vue components/resources)
unsync() // Unsyncs store from router