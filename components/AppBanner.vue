<template>
  <v-app class="banner">
    <vs-row>
      <vs-col w="7">
        <v-carousel
          class="banner1"
          height="300"
          cycle
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(item, i) in item1"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
          </v-carousel-item>
        </v-carousel>
      </vs-col>

      <vs-col w="5">
        <v-carousel
          class="banner2"
          height="147.5"
          cycle
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(item, i) in item2"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
          </v-carousel-item>
        </v-carousel>

        <v-carousel
          class="banner3"
          height="147.5"
          cycle
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(item, i) in item3"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
          </v-carousel-item>
        </v-carousel>
      </vs-col>
    </vs-row>
    <AppSalesBoxes />
  </v-app>
</template>

<script>
import AppSalesBoxes from '~/components/AppSalesBoxes.vue'
export default {
  components: {
    AppSalesBoxes,
  },
  data() {
    return {
      item1: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
      item2: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
      item3: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    }
  },
}
</script>

<style lang="scss" scoped>
.banner {
  .banner1 {
    margin: 10px;
    max-width: 97.5%;
    font-size: 3.5vmin;
    color: #efefef;
  }
  .banner2 {
    margin-top: 10px;
    max-width: 97.5%;
    font-size: 3.5vmin;
    color: #efefef;
  }
  .banner3 {
    margin-top: 5px;
    max-width: 97.5%;
    font-size: 3.5vmin;
    color: #efefef;
  }
  .img {
    max-width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>
