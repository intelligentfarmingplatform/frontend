<template>
  <div
    style="width: 180px; right: 0; left: auto"
    aria-labelledby="triggerId"
  >
    <section v-if="cartCount > 0">
      <div v-for="item in cart" :key="item.id">
        <div class="px-2 d-flex justify-content-between">
          <div>
            <strong>{{ item.name }}</strong>
            <br />
            {{ item.quantity }} x {{ item.price }}
          </div>
          <div>
            <a
              href="#"
              class="badge badge-secondary"
              @click.prevent="removeOneFromCart(item)"
              >remove</a
            >
          </div>
        </div>
        <hr />
      </div>

      <div class="d-flex justify-content-between">
        <span>Total: ${{ cartTotal }}</span>
        <a href="#" @click="clearCart(item)">Clear Cart</a>
      </div>
    </section>
    <section v-else class="center">Your cart is empty, fill it up!</section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['cart']),

    ...mapGetters(['cartCount', 'cartTotal']),
  },

  methods: {
    // Example 1: mapActions
    removeOneFromCart(item) {
      this.$store.commit('removeOneFromCart', item)
    },
    clearCart(item) {
      this.$store.commit('clearCart', item)
    },
  },
}
</script>

<style>
</style>
