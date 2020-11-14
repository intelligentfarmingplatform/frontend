<template>
  <v-container fluid grid-list-xl fill-height>
    <v-layout justify-center align-center>
      <div v-if="!isHasData">
        <v-img max-height="100%" max-width="100%" src="/clipboards.png"></v-img>
        <h4>ยังไม่มีการสั่งซื้อ</h4>
      </div>
      <div v-else>
        <template>
          <v-simple-table>
            <template>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Quantity</th>
                  <th class="text-left">Total Price</th>
                  <th class="text-left">สถานะการจัดส่ง</th>
                  <th class="text-left">ร้านค้า</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in listOrders" :key="item.id">
                  <td>{{ item.customerId }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.totalPrice }}</td>
                  <td>{{ item.orderStatus }}</td>
                  <td v-for="seller in item.cartItem" :key="seller.id">
                    {{ seller.nameseller }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import Axios from 'axios'
export default {
  data: () => ({
    isHasData: false,
  }),
  methods: {},
  async asyncData({$axios,$auth}) {
    console.log('asyncdata')
    await $auth.fetchUser()
    try {
      const config = {
        headers: {
          Authorization: $auth.getToken('local'),
        },
      }
      // this.$axios.setHeader('Authorization', this.$auth.getToken('local'))
      let response = await $axios.get(
        'http://127.0.0.1:4000/api/customer/orders',
        config
      )

      //console.log('datafrom order', response.data.order)
      if (response.data.success) {
  return { isHasData: true,listOrders: response.data.order }
      }

    } catch (err) {
      console.log(err)
    }
  },
  layout: 'dashboard',
}
</script>
s
