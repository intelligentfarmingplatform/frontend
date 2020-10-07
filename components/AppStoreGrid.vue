<template>
  <div class="storegrid">
        <b-container>
          <b-row>
            <b-col sm="4"  v-for="item in filteredprice" :key="item.id">
            <b-card
              title="Card Title"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
            <NuxtLink :to="`product/${item.id}`">
            <img :src="`/products/${item.img}`" height="200" />
            </NuxtLink>
            <star-rating
              :rating="item.starrating"
              active-color="#000"
              :star-size="15"
              :show-rating="false"
              style="margin: 5px 0"
            ></star-rating>
            <h3>{{ item.name }}</h3>
            <h4 class="price">{{ item.price }} บาท</h4>
            <nuxt-link :to="`product/${item.id}`">
              <b-button variant="outline-primary">ดูสินค้า ></b-button>
            </nuxt-link>
            </b-card>
            </b-col>
          </b-row>
        </b-container>
    
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
import StarRating from "vue-star-rating/src/star-rating.vue";

export default {
  name:'AppStoreGrid',
  props: {
    data: {
      required: true
    }
  },
  data() {
    return {
      min: 0,
      max: 200,
      pricerange: 200
    };
  },
  computed: {
    filteredprice() {
      return this.data.filter(el => el.price < this.pricerange);
    }
  },
  components: {
    StarRating
  }
};
</script>