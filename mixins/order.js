import { mapActions, mapGetters, mapState } from 'vuex'
import Axios from 'axios'
export default {
  data: () => ({
    active: false,
    input1: '',
    input2: '',
    checkbox1: false,
    e1: 1,
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
      await Axios.post(
        'https://intelligentfarmingplatform.herokuapp.com/api/customer/shipment',
        {
          shipment: this.delivery,
        }
      )
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
