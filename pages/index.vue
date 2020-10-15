<template>
  <div>
    <div class="index">
      <AppTextlockup />
    </div>
    <AppSalesBoxes />

    <AppTextlockup>
      <template v-slot:img>
        <img src="/web-bg.jpg" alt="bag" />
      </template>
    </AppTextlockup>
    <AppFeaturedProducts />
  </div>
</template>

<script>
import AppTextlockup from '~/components/AppTextlockup.vue'
import AppSalesBoxes from '~/components/AppSalesBoxes.vue'
import AppFeaturedProducts from '~/components/AppFeaturedProducts.vue'
export default {
  layout: 'default',
  components: {
    AppTextlockup,
    AppSalesBoxes,
    AppFeaturedProducts,
  },
}
</script>

<style>
.index {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
