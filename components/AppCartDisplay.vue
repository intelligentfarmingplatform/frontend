<template>
  <div class="cartDisplay">
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col>
          <v-simple-table fixed-header>
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
                <tr
                  height="105"
                  v-for="item in detailsWithSubTotal"
                  :key="item._id"
                >
                  <td>
                    <div width="500" class="modal-img">
                      <v-avatar>
                        <img :src="item.productimg" alt="John" />
                      </v-avatar>
                    </div>
                    <div class="productname">{{ item.title }}</div>
                  </td>
                  <td>{{ item.price }}</td>
                  <td>
                    <button
                      @click="removeOneFromCart(item)"
                      class="quantity-adjust"
                    >
                      -
                    </button>
                    {{ item.quantity }}
                    <button @click="addToCart(item)" class="quantity-adjust">
                      +
                    </button>
                  </td>
                  <td>{{ item.subtotal }}</td>
                  <td>
                    <div class="delete-product">
                      <v-btn
                        @click="removeAllFromCart(item)"
                        class="mx-2"
                        fab
                        dense
                        x-small
                        color="primary"
                      >
                        <v-icon dark> mdi-delete </v-icon>
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          รวมทั้งหมด {{ cartTotal }} บาท
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
    activeTooltip1: false,
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
        source: detail,
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
.productname {
  margin-top: 5px;
  justify-content: 'center';
}
.modal-img {
  justify-content: 'center';
}
.delete-product {
}
</style>

<style lang="stylus" scoped>
getColor(colorx, alpha = 1) {
  unquote('rgba(var(--vs-' + colorx + '), ' + alpha + ')');
}

getVar(var) {
  unquote('var(--vs-' + var + ')');
}

.content-tooltip {
  .body {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .vs-avatar-content {
      margin-top: -30px;
      border: 3px solid getVar('theme-layout');
      box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
    }

    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 0.55rem;
      padding: 10px;
      font-weight: normal;

      span {
        font-weight: bold;
        font-size: 0.7rem;
      }
    }
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h4 {
    padding: 8px;
    margin: 0px;
    text-align: left;
  }

  p {
    text-align: left;
    padding: 0px;
    margin: 0px;
    line-height: 1rem;
    padding-bottom: 5px;
    padding-left: 8px;
  }
}
</style>
