<template>
  <div class="productPage">
    <AppProduct />
    <AppFeaturedProducts />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppProduct from '~/components/AppProduct.vue'
import AppFeaturedProducts from '~/components/AppFeaturedProducts.vue'
export default {
  components: {
    AppProduct,
     AppFeaturedProducts,
  },
  async fetch({ store }) {
    await store.dispatch('loadAllProducts')
  },
}
</script>
<style lang="scss" scoped>
.productPage{
   height: 100%;
}
</style>
