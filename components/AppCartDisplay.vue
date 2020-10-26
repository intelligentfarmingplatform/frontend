<template>
  <div class="cartDisplay">
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>สินค้า</th>
                  <th>ราคา</th>
                  <th>จำนวน</th>
                  <th>รวม</th>
                  <th>ลบสินค้า</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in detailsWithSubTotal" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.price }}</td>
                  <td>
                    <button
                      @click="removeOneFromCart(item)"
                      class="quantity-adjust"
                    >
                      -</button
                    > {{ item.quantity }}
                    <button @click="addToCart(item)" class="quantity-adjust">
                      +
                    </button>
                  </td>
                  <td>{{item.subtotal}}</td>
                  <td>            <vs-button @click="removeAllFromCart(item)" class="delete-product">
              ลบ
            </vs-button></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AppPayment from '~/components/AppPayment.vue'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  data: () => ({
    detailsActive: false,
  }),
  components: {
    AppPayment,
  },
  computed: {
    ...mapState(['cart']),
    detailsWithSubTotal() {
      return this.cart.map((detail) => ({
        ...detail,
        subtotal: detail.quantity * detail.price,
        source: detail
      }))
    },
    ...mapGetters(['cartCount', 'cartTotal']),
  },
  methods: {
    addToCart(item) {
      this.$store.commit('addOneToCart', item)
    },
    removeOneFromCart(item) {
      this.$store.commit('removeOneFromCart', item)
    },
    removeAllFromCart(item) {
      this.$store.commit('removeAllFromCart', item)
    },
  },
}
</script>


<style lang="scss" scoped>
.modal-img {
  justify-content: 'center';
}
</style>
