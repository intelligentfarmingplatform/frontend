<template>
  <div class="cartMain">
    <v-container>
      <vs-row class="cartStep">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
          <AppCartSteps />
        </vs-col>
      </vs-row>
    </v-container>
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
.cartStep {
  margin-top: 10px;
}
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
