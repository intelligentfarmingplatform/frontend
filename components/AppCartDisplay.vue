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
                  :key="item.id"
                >
                  <td>
                    <div width="500" class="modal-img">
                      <v-avatar>
                        <img
                          :src="`https://intelligentfarmingplatform.herokuapp.com/${item.productimg}`"
                          alt="John"
                        />
                      </v-avatar>
                    </div>
                    <div class="productname">{{ item.productname }}</div>
                  </td>
                  <td>{{ item.productprice }}</td>
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

          <v-col class="d-flex" cols="12" sm="6">
            <vs-select
              :loading="Loaded"
              label-placeholder="เลือกบริการขนส่ง"
              v-model="delivery"
              v-on:change="onChooseShipping()"
            >
              <vs-option label="EMS ลงทะเบียน" value="normal">
                EMS ลงทะเบียน
              </vs-option>
              <vs-option label="Kerry Express" value="express">
                Kerry Express
              </vs-option>
            </vs-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="12"
            ><div>ค่าจัดส่ง {{ this.$store.state.shippingPrice }} บาท</div></v-col
          >
          <v-col class="d-flex" cols="12" sm="12"
            ><div>วันที่จะได้รับ {{ this.$store.state.shippingEstimatedDelivery }}</div></v-col
          >
          <v-col class="d-flex" cols="12" sm="12"
            ><div>รวมทั้งหมด {{ cartTotalWithShipping }} บาท</div></v-col
          >
          <v-col class="d-flex" cols="12" sm="4"><div ref="card"></div></v-col>
        </v-col>
      </v-row>
      <v-btn color="primary" elevation="2" @click="onPurchase"
        >ยืนยันการสั่งซื้อ</v-btn
      >
    </v-container>
  </div>
</template>

<script>
import Axios from 'axios'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  data: () => ({
    error: '',
    stripe: null,
    card: '',

    Loaded: true,
    detailsActive: false,
    activeTooltip1: false,
    shippingPrice: '',
    estimatedDelivery: '',
    delivery: 'normal',
  }),
  // async asyncData({Axios,state}) {
  //   try {
  //     let response = await Axios.post('http://127.0.0.1:4000/api/shipment', {
  //       shipment: 'normal',
  //     })
  //     console.log('datafrom async',response.data)
  //     $store.commit('setShipping', {
  //       price: response.shipment.price,
  //       estimatedDelivery: response.shipment.estimated,
  //     })
  //     return {
  //       shippingPrice: response.shipment.price,
  //       estimatedDelivery: response.shipment.estimated,
  //     }
  //   } catch (err) {}
  // },
  components: {},
  computed: {
    ...mapState(['cart']),
    detailsWithSubTotal() {
      return this.cart.map((detail) => ({
        ...detail,
        subtotal: detail.quantity * detail.productprice,
        source: detail,
      }))
    },
    ...mapGetters([
      'cartCount',
      'cartTotal',
      'cartTotalWithShipping',
      'getEstimatedDelivery',
    ]),
  },
  mounted() {
          this.stripe = Stripe(
        'pk_test_51Hg9lmAFMKlS8CSVt1AbCsoCYIz3CFIrcV0tddZirj0H7rnBHxqwv8eOIYDBoygBUTlCdg4axOMnZsLSD6tmXlro009D4jrTF4'
      )
      let elements = this.stripe.elements()
      this.card = elements.create('card')
      // Add an instance of the card Element into the `card-element` <div>
      this.card.mount(this.$refs.card)
      //console.log(this.$auth.getToken('local'))
    if(this.$store.state.shippingPrice){
      this.Loaded = false
    }
  },
  methods: {
    async onPurchase() {
      try {
        this.$axios.setHeader('Authorization', this.$auth.getToken('local'))
        let token = await this.stripe.createToken(this.card)
        let response = await this.$axios.post(
          'https://intelligentfarmingplatform.herokuapp.com/api/customer/payment',
          {
            token: token,
            totalPrice: this.cartTotalWithShipping,
            cart: this.cart,
            estimatedDelivery: this.getEstimatedDelivery,
          }
        )
        if (response.data.success) {
          //do something
          this.$store.commit('clearCart')
          this.$router.push({ path: '/' })
        }
      } catch (err) {
        console.log(err)
      }
    },
    async onChooseShipping() {
      await Axios.post('https://intelligentfarmingplatform.herokuapp.com/api/customer/shipment', {
        shipment: this.delivery,
      })
        .then((response) => {
          this.Loaded = true
          console.log('datafrom fetch', response.data)
          this.$store.commit('setShipping', {
            price: response.data.shipment.price,
            estimatedDelivery: response.data.shipment.estimated,
          })
          ;(this.shippingPrice = response.data.shipment.price),
            (this.estimatedDelivery = response.data.shipment.estimated)
          this.Loaded = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
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
