<template>
  <section>
    <h2>
      <span>Featured Products</span>
    </h2>
    <div class="featureditems">
      <vs-row justify="center">
        <div class="item" v-for="product in featuredProducts" :key="product.id">
          <img :src="`/products/${product.img}`" height="200" />
          <h3>{{ product.name }}</h3>
          <h4>{{ product.price }} บาท</h4>
          <nuxt-link :to="`/product/${product.id}`">
            <vs-button border>ดูสินค้า ></vs-button>
          </nuxt-link>
        </div>
      </vs-row>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  data: () => {
    return {
      featuredProducts: [],
    }
  },

  async fetch() {
    await axios
      .get('https://it-ifp-auth.herokuapp.com/api/myproducts/featured/all')
      .then((response) => {
        this.featuredProducts = response.data.products
      })
      .catch((err) => {
        console.log(err)
      })
   },
  computed: {},
}
</script>

<style lang="scss" scoped>
section {
  margin-top: 60px;
}

.featureditems {
  width: 100%;
  margin: 20px 0 70px;
  .item {
    border: 1px solid #eee2dc;
    box-shadow: 0 3px 10px 0px #eee;
    border-radius: 40px;
    padding: 15px;
    min-height: 150px;
    justify-self: center;
    align-self: center;
    text-align: center;
  }
}

h4 {
  color: #d96528;
  margin: 10px 0;
}

h2 {
  color: #d96528;
  text-align: center;
  overflow: hidden;
}
h2 span {
  display: inline-block;
  position: relative;
}
h2 span:after,
h2 span:before {
  content: ' ';
  display: block;
  height: 1px;
  width: 1000px;
  background: #e6baa4;
  position: absolute;
  top: 50%;
}
h2 span:before {
  left: -1010px;
}
h2 span:after {
  right: -1010px;
}
</style>
