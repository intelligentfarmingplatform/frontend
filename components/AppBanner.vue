<template>
  <div class="banner">
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
            v-for="(item, i) in item"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
          </v-carousel-item>
        </v-carousel>
      </vs-col>

      <vs-col w="5">
        <img class="banner2" src="/banner/banner2.jpg" height="147.5"/>

        <img class="banner3" src="/banner/banner3.jpg" height="147.5"/>
      </vs-col>
    </vs-row>

  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      item: [
        {
          src: '/web-bg.jpg',
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
    width: 97.5%;
    font-size: 3.5vmin;
    color: #efefef;
  }
  .banner3 {
    margin-top: 0.5px;
    width: 97.5%;
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
