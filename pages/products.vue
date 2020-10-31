<template>
  <div>
    <AppProduct />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppProduct from '~/components/AppProduct.vue'

export default {
  components: {
    AppProduct,
  },
  async fetch({ store }) {
    await store.dispatch('loadAllProducts')
  },
}
</script>
