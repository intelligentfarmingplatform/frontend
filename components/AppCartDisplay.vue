<template>
  <div>
    <vs-table>
      <template #thead>
        <vs-tr>
          <vs-th> Product </vs-th>
          <vs-th> Price </vs-th>
          <vs-th> Quantity </vs-th>
          <vs-th> Total </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr v-for="item in cart" :key="item.id">
          <vs-td>
            <vs-avatar>
              <img
                :src="`/products/${item.img}`"
                alt=""
                @click="detailsActive = !detailsActive"
              />
            </vs-avatar>
            {{ item.name }}
          </vs-td>
          <vs-td>
            {{ item.price }}
          </vs-td>
          <vs-td>
            <button @click="removeOneFromCart(item)" class="quantity-adjust">
              -
            </button>
            {{ item.quantity }}
            <button @click="addToCart(item)" class="quantity-adjust">+</button>
          </vs-td>
          <vs-td>
            {{ item.quantity * item.price }}
          </vs-td>
          <vs-button border danger @click="removeAllFromCart(item)">
            x
          </vs-button>
          <vs-dialog v-model="detailsActive">
            <template #header>
              <h3>
                {{ item.name }}
              </h3>
            </template>
               <hr>
            <div class="con-content">
              <vs-avatar class="modal-img">
                <img :src="`/products/${item.img}`" alt="" />
              </vs-avatar>
              <br />
              <p class="modal-price">ราคา :  {{ item.price }} บาท</p>

              <p class="modal-description">รายละเอียดสินค้า :  {{ item.description }} </p>
            </div>
          </vs-dialog>
        </vs-tr>
      </template>
    </vs-table>
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
