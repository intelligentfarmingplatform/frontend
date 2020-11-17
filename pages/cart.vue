<template>
  <div class="cartMain">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <AppCartSteps />
        <hr />
        <h2 class="center">Your Cart</h2>

        <section v-if="cartUIStatus === 'idle'">
          <AppCartDisplay />
        </section>

        <section
          v-else-if="cartUIStatus === 'loading'"
          class="loader"
        ></section>

        <section v-else-if="cartUIStatus === 'success'" class="success">
          <h2>Success!</h2>
          <p>
            Thank you for your purchase. You'll be receiving your items in 4
            business days.
          </p>
          <p>Forgot something?</p>
          <vs-button class="pay-with-stripe">
            <nuxt-link exact to="/">Back to Home</nuxt-link>
          </vs-button>
        </section>

        <section v-else-if="cartUIStatus === 'failure'">
          <p>
            Oops, something went wrong. Redirecting you to your cart to try
            again.
          </p>
        </section>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import AppCartSteps from '~/components/AppCartSteps.vue'
import AppCartDisplay from '~/components/AppCartDisplay.vue'
import { mapState } from 'vuex'

export default {
  components: {
    AppCartDisplay,
    AppCartSteps,
  },
  async asyncData({ $axios, store, $auth }) {
    await $auth.fetchUser()
    console.log('asyncedata')
    try {
      let response = await $axios.post(
        'https://it-ifp-auth.herokuapp.com/api/shipment',
        {
          shipment: 'normal',
        }
      )

      console.log('datafrom asyncDData', response.data)
      store.commit('setShipping', {
        price: response.data.shipment.price,
        estimatedDelivery: response.data.shipment.estimated,
      })
      return {
        Loaded: false,
        shippingPrice: response.data.shipment.price,
        estimatedDelivery: response.data.shipment.estimated,
      }
    } catch (err) {
      console.log(err)
    }
  },
  computed: {
    ...mapState(['cartUIStatus']),
  },
}
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
}

.success {
  text-align: center;
}
.center {
  text-align: center;
}

@media screen and (min-width: 700px) {
  .cartMain {
    margin-top: 45px;
    justify-self: center;
    align-self: center;
    text-align: center;
  }
}

@media screen and (max-width: 699px) {
  .cartMain {
    margin-top: 45px;
    width: 95vw;
    justify-self: center;
    align-self: center;
    text-align: center;

    justify-content: center;
  }
  .cardstep {
    margin-top: 50px;
  }
}
</style>
