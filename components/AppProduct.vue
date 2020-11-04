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
                <h3>{{ item.productname }}</h3>
              </template>
              <template #img>
                <img :src="`https://intelligentfarmingplatform.herokuapp.com/${item.productimg}`" />
              </template>
              <template #text>
              <h4 class="price">{{ item.productprice }} บาท</h4>
              <h4 class="price">เหลือ {{ item.productnumber }} ชิ้น</h4>
              <!-- <h4 class="price">ประเภทสินค้า {{ item.category.type }}</h4>
              <h4 class="price">โดย {{ item.users.username }}</h4> -->
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
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'AppProduct',
  data() {
    return {
      searchResult: '',
      item: '',
      search: '',
    }
  },
  components: {},
  computed: {
    ...mapState(['products']),
  },
}
</script>

<style lang="scss" scoped>
  .search {
    width: 100%;
  }
</style>
