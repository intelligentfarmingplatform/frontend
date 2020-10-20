<template>
  <v-app class="banner">
    <vs-row>
      <vs-col w="6">
        <v-carousel
          class="banner1"
          height="400"
          cycle
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="display-3">{{ slide }} Slide</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </vs-col>

      <vs-col w="6">
        <v-carousel
          class="banner2"
          height="195"
          cycle
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="display-3">{{ slide }} Slide</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>

        <v-carousel
          class="banner3"
          height="195"
          cycle
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="display-3">{{ slide }} Slide</div>
              </v-row>
            </v-sheet>
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
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
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
    margin-top: 10px;
    max-width: 97.5%;
    font-size: 3.5vmin;
    color: #efefef;
  }
  .img {
    max-width: 100%;
    grid-area: 1 / 1 / 6 / 4;
    img {
      width: 100%;
    }
  }
}
</style>
