<template>
  <div>
    <vs-col>
      <section class="item-contain">
        <section class="img">
          <img :src="product.productimg" height="300" />
        </section>
        <section class="product-info">
          <h1>{{ product.title }}</h1>
          <h4 class="price">{{ product.price }} บาท</h4>
          <p>{{ product.description }}</p>
          <p>ทดสอบๆ</p>
          <div class="product-options">
            <div class="quantity">
              <vs-button
                class="update-num"
                @click="quantity > 0 ? quantity-- : (quantity = 0)"
                >-</vs-button
              >
              <input type="number" v-model="quantity" />
              <vs-button class="update-num" @click="quantity++">+</vs-button>
            </div>
          </div>
          <p>เหลือ : {{product.stockQty}} ชิ้น</p>
          <p>
            <vs-button border class="button purchase" @click="cartAdd"
              >หยิบใส่ตะกร้า</vs-button
            >
          </p>
        </section>
      </section>

      <hr />
      <div class="review">
        <h2>Reviews</h2>
        <!-- maybe an image of a person? -->
        
        <p>ทดสอบๆ</p>
      </div>
    </vs-col>
    <app-featured-products />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import AppFeaturedProducts from '~/components/AppFeaturedProducts.vue'

export default {
  components: {
    AppFeaturedProducts,
  },
  data() {
    return {
      id: this.$route.params.id,

      quantity: 1,
      showSizeRequiredMessage: false,
      tempcart: [], // this object should be the same as the json store object, with additional params, quantity and size
    }
  },
  async fetch({ store, params }) {
    //return this.getProduct()
    await store.dispatch('loadAllProducts');
    
  },
  computed: {
    ...mapState(['products']),
    product() {
     return this.products.find((p) => p._id == this.$route.params.id)
     console.log(product)
    },
    //storedata: (state) => state.storedata,
  },
  methods: {
    // ...mapActions({
    //   getProduct: 'getProduct',

    // }),
    cartAdd() {
      let item = this.product
      item = {
        ...item,
        quantity: this.quantity,
        size: this.size,
      }
      this.tempcart.push(item)
      this.$store.commit('addToCart', { ...item })
    },
  },
}
</script>

<style lang="scss" scoped>
.item-contain {
  margin-top: 44px;
  margin-left: 8%;
  width: 80%;
  display: grid;
  justify-content: space-around;
  grid-template-columns: 1fr 2fr;
}

.product-options {
  display: grid;
}

input,
select {
  width: 60px;
  font-size: 25px;
  margin: 0 5px;
  padding: 5px 10px;
}

.update-num {
  background: black;
  border-color: black;
  color: white;
  font-size: 20px;
  width: 45px;
}

.size {
  margin-left: 10px;
}

.size-picker {
  width: 130px;
  font-size: 20px;
  height: 100%;
  border: 0;
  background-color: white;
  outline: 1px solid #ccc;
  outline-offset: -1px;
}

.quantity {
  display: flex;
}

.size-required-message {
  color: red;
}

@media screen and (max-width: 650px) {
  .img img {
    width: 100%;
  }

  .item-contain {
    margin-left: 0 !important;
    width: 95% !important;
  }

  .review {
    width: 90%;
    margin-left: 4%;
  }
}
</style>
