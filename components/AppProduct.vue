<template>
  <div class="appproduct">
    <div class="search" style="margin-top: 60px">
      <vs-row>
        <vs-col offset="2" w="6">
          <vs-input v-model="search" border placeholder="ค้นหา" />
        </vs-col>
      </vs-row>
    </div>
    <div class="container" style="margin-top: 20px">
      <vs-row>
        <vs-col w="4" vs-justify="left" vs-align="left">
          <vs-button-group>
            <vs-button> ผักสด </vs-button>
            <vs-button> ผักเน่า </vs-button>
            <vs-button> ผักเสีย </vs-button>
            <vs-button> ผักเต็มไปด้วยสารพิษ </vs-button>
          </vs-button-group>
        </vs-col>
        <vs-row>
          <vs-col
            vs-justify="center"
            vs-align="center"
            w="2"
            v-for="item in searchResult"
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
      </vs-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AppProduct',

  props: {
    data: {
      required: true,
    },
  },
  data() {
    return {
      searchResult: '',
      item: '',
      products: [],
      search: '',
    }
  },
  async fetch() {
    await axios
      .get('https://it-ifp-auth.herokuapp.com/api/myproducts')
      .then((response) => {
        this.products = response.data.products
      })
      .catch((err) => {
        console.log(err)
      })
  },
  computed: {
    searchfilter: function () {
      axios
        .get('https://it-ifp-auth.herokuapp.com/api/myproducts')
        .then((response) => {
          this.searchResult = response.data.products
          console.log(this.searchResult)
          return this.searchResult.filter((item) => {
            return item.name.match(this.search)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
  .search {
    width: 100%;
  }
</style>
