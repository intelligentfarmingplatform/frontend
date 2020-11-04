<template>
  <div class="storegrid">
    <vs-row>
      <vs-col offset="2" w="6">
        <vs-input v-model="search" border placeholder="สินค้าทั้งหมด" />
      </vs-col>
    </vs-row>
    <vs-row justify="center">
      <div
        :key="i"
        v-for="(item, i) in $vs.getSearch(products, search)"
        :data="item"
      >
        <vs-col>
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
              <!-- <h4 class="price">ประเภทสินค้า {{ item.category.type }}</h4> -->
              <!-- <h4 class="price">โดย {{ item.users.username }}</h4> -->
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
      </div>
    </vs-row>
  </div>
</template>

<script>
import axios  from 'axios'
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
