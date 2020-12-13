<template>
  <v-row class="banner" ma-0>
    <v-col cols="12" md="8">
      <v-carousel
        class="banner1"
        height="250"
        white="100%"
        cycle
        :show-arrows="false"
        hide-delimiter-background
        hide-delimiters
      >
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>
    </v-col>
    <v-col cols="12" md="4">
      <div class="banner-main">
        <v-img
          src="https://cf.shopee.co.th/file/db50005c7d0a77ed3f42791d89047052_xhdpi"
          max-height="120px"
        >
        </v-img>
        <v-img
          src="https://cf.shopee.co.th/file/ce340b0df2cc107447559dc5ff9d9f81_xhdpi"
          max-height="125px"
        >
        </v-img>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      items: [
        {
          src:
            'https://images.unsplash.com/photo-1518843875459-f738682238a6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=726&q=100',
        },
        {
          src:
            'https://images.unsplash.com/photo-1445282768818-728615cc910a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=100',
        },
        // {
        //   src: 'https://images.unsplash.com/photo-1515356956468-873dd257f911?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=&q=100',
        // },
        {
          src:
            'https://images.unsplash.com/photo-1598123586091-ff6a30ed031c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=100',
        },
        {
          src:
            'https://image.freepik.com/free-photo/portrait-young-smiling-farmer-with-freshly-picked-tomato-vegetable-standing-hothouse-garden_342744-1380.jpg',
        },
        {
          src:
            'https://image.freepik.com/free-photo/close-up-old-farmer-holding-basket-vegetables-man-is-standing-garden-senior-black-apron_1157-39726.jpg',
        },
        {
          src:
            'https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=749&q=100',
        },
        {
          src:
            'https://images.unsplash.com/photo-1457530378978-8bac673b8062?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=100',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.v-carousel,.v-responsive {
  border-radius: 5px;
}
.banner {
  .row {
    margin: 0px;
  }
  .banner-main {
    height: 100% !important;
    display: flex;
    flex-direction: column;
    align-content: space-between;
    flex-flow: wrap;
    border-radius: 5px;

    .banner-main-r {
      height: 45%;
    }
  }
}
</style>
