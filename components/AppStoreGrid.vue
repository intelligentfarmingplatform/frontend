<template>
  <div class="storegrid">
    <div class="container">
      <vs-row>
        <vs-col offset="2" w="6">
          <vs-input v-model="search" border placeholder="สินค้าทั้งหมด" />
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col
          vs-justify="center"
          vs-align="center"
          w="2"
          v-for="item in products"
          :key="item.id"
        >
          <vs-card>
            <template #title>
              <h3>{{ item.name }}</h3>
            </template>
            <template #img>
              <img :src="`/products/${item.img}`" height="200" />
            </template>
            <template #text>
              <h4 class="price">{{ item.price }} บาท</h4>
              <nuxt-link :to="`main/product/${item.id}`">
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppStoreGrid',
  data() {
    return {
      search: '',
    }
  },
  computed: {
    ...mapState(['products']),
  },
}
</script>

<style scoped>
.storegrid {
  margin: 10px;
  justify-self: center;
  align-self: center;
  text-align: center;
}
</style>
