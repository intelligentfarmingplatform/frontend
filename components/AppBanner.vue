<template>
  <div class="banner">
    <vs-row>
      <vs-col w="7">
        <img class="banner1" src="/web-bg.jpg" height="300"/>
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

    }
  },
}
</script>

<style lang="scss" scoped>
.banner {
  .banner1 {
    margin: 10px;
    max-width: 100%;
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
