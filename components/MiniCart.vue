<template>
  <div
    class="dropdown-menu p-2"
    style="min-width:320px; right:0; left:auto"
    aria-labelledby="triggerId"
  >
    <div v-for="item in cart" :key="item.id">
      <div class="px-2 d-flex justify-content-between">
        <div>
          <strong>{{ item.name }}</strong>
          <br />
          {{ item.quantity }} x ${{ item.price }}
        </div>
        <div>
          <a
            href="#"
            class="badge badge-secondary"
            @click.prevent="removeOneFromCart(item)"
          >remove</a>
        </div>
      </div>
      <hr />
    </div>

    <div class="d-flex justify-content-between">
      <span>Total: ${{ cartTotal }}</span>
      <a href="#" @click.prevent="removeAllFromCart(item)">Clear Cart</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("cart", ["cart"]),

    ...mapGetters("cart", ["cartTotal"])
  },
  mounted() {
    this.getCartItems();
  },

  methods: {
    // Example 1: mapActions
    ...mapActions("cart", [
      "removeOneFromCart",
      "removeAllFromCart",
      "getCartItems"
    ])
    
  }
};
</script>

<style>
</style>