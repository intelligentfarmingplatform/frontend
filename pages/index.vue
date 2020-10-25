<template>
  <v-app>
    <div class="banner">
      <AppBanner />
    </div>
    <AppSalesBoxes />
    <AppStoreGrid />
    <AppFeaturedProducts />
  </v-app>
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
  async fetch({ store }) {
    await store.dispatch('loadAllProducts')
  },
}
</script>

<style scoped>
.banner {
  margin-top: 35px;
}

.title {
  font-family: 'Prompt';
  display: block;
  font-weight: 300;
  font-size: 55px;
  color: #35495e;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin: 25px 0;
}

.subtitle {
  font-weight: 300;
  font-size: 1.1rem;
  color: #526488;
  word-spacing: 2px;
  padding-bottom: 15px;
  max-width: 600px;
}

.subtitle a {
  font-weight: 500;
  color: inherit;
}

.links {
  padding-top: 15px;
  margin-bottom: 20px;
}

.content-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 500px;
}

.plus {
  font-size: 2.5rem;
  margin: 15px;
  color: #35495e;
}

.h3 {
  font-family: 'Prompt', sans-serif;
  font-weight: 400;
  margin: 10px;
}
</style>
