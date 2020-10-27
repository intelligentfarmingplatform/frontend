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
                  <td>
                    <vs-tooltip shadow interactivity>
                      <vs-avatar>
                        <img
                          :src="`/products/${item.img}`"
                          :alt="item.name"
                          class="product-img"
                        />
                      </vs-avatar>
                      <template #tooltip>
                        <div class="content-tooltip">
                          <div class="body">
                            <div class="text">
                              Cosed Tasks
                              <span> 89 </span>
                            </div>
                            <vs-avatar
                              circle
                              size="80"
                              @click="activeTooltip1 = !activeTooltip1"
                            >
                              <img
                                :src="`/products/${item.img}`"
                                :alt="item.name"
                                class="product-img"
                              />
                            </vs-avatar>
                            <div class="text">
                              Open Tasks
                              <span> 8 </span>
                            </div>
                          </div>
                          <footer>
                            <vs-button circle icon border>
                              <i class="bx bxs-share-alt"></i>
                            </vs-button>
                            <vs-button circle> Message </vs-button>
                            <vs-button circle icon border>
                              <i class="bx bx-like"></i>
                            </vs-button>
                          </footer>
                        </div>
                      </template>
                    </vs-tooltip>
                    {{ item.name }}
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
                    <vs-button
                      @click="removeAllFromCart(item)"
                      class="delete-product"
                    >
                      ลบ
                    </vs-button>
                  </td>
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
.modal-img {
  justify-content: 'center';
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

