<template>
  <div
    style="width: 180px; right: 0; left: auto"
    aria-labelledby="triggerId"
  >

        <tr v-for="item in cart" :key="item.id">
          <vs-td>
            {{ item.name }}
          </vs-td>
          <vs-td>
            {{ item.price }}
          </vs-td>
          <vs-td>
            {{ item.quantity }}
          </vs-td>
          <vs-button border danger @click="removeAllFromCart(item)">
            x
          </vs-button>
        </tr>
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
