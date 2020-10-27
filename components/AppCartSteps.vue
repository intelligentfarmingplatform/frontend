<template>
  <section>
    <div class="shopping">
      <h4>Shopping Cart</h4>
    </div>
    <div class="checkout">
      <h4>Check out</h4>
    </div>
    <div class="order">
      <h4>Order Complete</h4>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['cartUIStatus']),
    ...mapGetters(['cartCount']),
  },
}
</script>

<style lang="scss" scoped>
section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 100px;
  grid-row-gap: 0px;
  text-align: center;
  width: 80%;
  margin: 20px auto 0;
  margin-top: 50px;
  div {
    display: grid;
    flex-direction: column;
    align-items: center;
  }
}



h4 {
  margin-top: 20px;
  color: #555;
}

@media screen and (max-width: 600px) {
  section {
    grid-column-gap: 30px !important;
  }
}
</style>
