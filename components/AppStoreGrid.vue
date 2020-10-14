<template>
  <div class="storegrid">
    <div class="container" style="margin-top: 60px">
      <vs-row>
        <vs-col
          vs-justify="center"
          vs-align="center"
          w="4"
          v-for="item in filteredprice"
          :key="item.id"
        >
          <vs-card>
            <template #title>
              <h3>{{ item.name }}</h3>
            </template>
            <template #img>
              <img :src="`/products/${item.img}`" height="350" />
            </template>
            <template #text>
              <h4 class="price">{{ item.price }} บาท</h4>
              <nuxt-link :to="`product/${item.id}`">
                <vs-button border> ดูสินค้า </vs-button>
              </nuxt-link>
            </template>
            <template #interactions>
              <vs-button danger icon>
                <i class="bx bx-heart"></i>
              </vs-button>
              <vs-button class="btn-chat" shadow primary>
                <i class="bx bx-chat"></i>
                <span class="span"> 54 </span>
              </vs-button>
            </template>
          </vs-card>
        </vs-col>
      </vs-row>
    </div>

    <aside>
      <h3>Filter by Price:</h3>
      <p style="margin-top: 5px">
        Max Price
        <strong>${{ pricerange }}</strong>
      </p>
      <input
        class="slider"
        id="pricerange"
        type="range"
        v-model="pricerange"
        :min="min"
        :max="max"
        step="0.1"
      />
      <span class="min">${{ min }}</span>
      <span class="max">${{ max }}</span>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'AppStoreGrid',
  props: {
    data: {
      required: true,
    },
  },
  data() {
    return {
      min: 0,
      max: 200,
      pricerange: 200,
    }
  },
  computed: {
    filteredprice() {
      return this.data.filter((el) => el.price < this.pricerange)
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 0;
}
</style>
