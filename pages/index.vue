<template>
  <div>
    <div class="container">
      <div class="banner">
        <AppBanner />
      </div>
      <div class="inner" style="padding-bottom: 5px">
        <AppSalesBoxes />
      </div>
      <AppStoreGrid />
      <AppFeaturedProducts />
    </div>
  </div>
</template>

<script>
import AppBanner from '~/components/AppBanner.vue'
import AppStoreGrid from '~/components/AppStoreGrid.vue'
import AppFeaturedProducts from '~/components/AppFeaturedProducts.vue'
import AppSalesBoxes from '~/components/AppSalesBoxes.vue'
export default {
  layout: 'default',
  components: {
    AppBanner,
    AppStoreGrid,
    AppFeaturedProducts,
    AppSalesBoxes,
  },
  data() {
    return {}
  },
  async fetch({ store }) {
    await store.dispatch('loadAllProducts')
  },
}
</script>

<style scoped>
.inner {
  padding-top: 10px;
  background-color: white;
}
.banner {
  margin-top: 60px;
}
</style>
