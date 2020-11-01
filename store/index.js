import axios from 'axios'
import productProvider from '~/resources/provider'
const userService = new productProvider()
//import data from '~/static/storedata.json'

//

// const data = axios.get(
//   'https://it-ifp-auth.herokuapp.com/api/myproducts').then(resp => {

//     console.log(resp.data.products);
// })

export const state = () => ({
  cartUIStatus: 'idle',
  products: [],
  cart: [],
  clientSecret: '', // Required to initiate the payment from the client
})

export const getters = {
  // //check loggedin status
  // isAuthenticated(state) {
  //   return state.auth.loggedIn
  // },

  // loggedInUser(state) {
  //   return state.auth.user
  // },
  //featuredProducts: (state) => state.storedata.slice(0, 3),
  cartCount: (state) => {
    if (!state.cart.length) return 0
    return state.cart.reduce((ac, next) => ac + next.quantity, 0)
  },
  cartTotal: (state) => {
    if (!state.cart.length) return 0
    return state.cart.reduce((ac, next) => ac + next.quantity * next.price, 0)
  },
  cartItems: (state) => {
    if (!state.cart.length) return []
    return state.cart.map((item) => {
      return {
        id: item._id,
        quantity: item.quantity,
      }
    })
  },
  clientSecret: (state) => state.clientSecret,
}

export const mutations = {
  SET_PRODUCTS(state, products) {
    return (state.products = products)
  },
  SET_ALLPRODUCTS(state, products) {
    return (state.products = products)
  },
  updateCartUI: (state, payload) => {
    state.cartUIStatus = payload
  },
  clearCart: (state) => {
    //this clears the cart
    ;(state.cart = []), (state.cartUIStatus = 'idle')
  },
  addToCart: (state, payload) => {
    let itemfound = state.cart.find((el) => el._id === payload._id)
    itemfound
      ? (itemfound.quantity += payload.quantity)
      : state.cart.push(payload)
  },
  setClientSecret: (state, payload) => {
    state.clientSecret = payload
  },
  addOneToCart: (state, payload) => {
    let itemfound = state.cart.find((el) => el._id === payload._id)
    itemfound ? itemfound.quantity++ : state.cart.push(payload)
  },
  removeOneFromCart: (state, payload) => {
    let index = state.cart.findIndex((el) => el._id === payload._id)
    state.cart[index].quantity
      ? state.cart[index].quantity--
      : state.cart.splice(index, 1)
  },
  removeAllFromCart: (state, payload) => {
    state.cart = state.cart.filter((el) => el._id !== payload._id)
  },
}

export const actions = {
  async getOneProduct({ commit }, { productId }) {
    await axios
      .get(`https://it-ifp-auth.herokuapp.com/api/products/${productId}`)
      .then((response) => {
        console.log(response.data)
        let products = response.data.products
        commit('SET_PRODUCTS', products)
      })
  },

  async loadAllProducts({ commit }) {
    await axios
      .get('https://it-ifp-auth.herokuapp.com/api/products')
      .then((res) => {
        let products = res.data.products
        commit('SET_PRODUCTS', products)
      })
  },
  async getProduct({ commit }) {
    const products = await userService.getProduct()
    commit('SET_PRODUCT', products)
    return products
  },
  async createPaymentIntent({ getters, commit }) {
    try {
      // Create a PaymentIntent with the information about the order
      const result = await axios.post(
        'https://ecommerce-netlify.netlify.app/.netlify/functions/create-payment-intent',
        {
          items: getters.cartItems,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (result.data.clientSecret) {
        // Store a reference to the client secret created by the PaymentIntent
        // This secret will be used to finalize the payment from the client
        commit('setClientSecret', result.data.clientSecret)
      }
    } catch (e) {
      console.log('error', e)
    }
  },
}
