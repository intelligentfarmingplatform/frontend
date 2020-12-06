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
                  <th class="text-left">หมายเลขสั่งซื้อ</th>
                  <th class="text-left">Quantity</th>
                  <th class="text-left">Total Price</th>
                  <th class="text-left">ร้านค้า</th>
                  <th class="text-left">สถานะการจัดส่ง</th>
                  <th class="text-left">ชำระเงิน</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in listOrders" :key="item.id">
                  <td>{{ item.CustomerTransactions[0].orderNo }}</td>
                  <td>{{ item.totalQuantity }}</td>
                  <td>{{ item.totalPrice }}</td>
                  <td>{{ item.seller }}</td>
                  <td>{{ item.CustomerDeliveries[0].orderStatus }} {{index+1}}</td>
                  <td ><v-btn color="primary" v-show="item.CustomerDeliveries[0].orderStatus==='Pending'">ชำระเงิน</v-btn></td>
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
  async asyncData({ $axios, $auth }) {
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
        'http://maims.cmtc.ac.th:3000/api/customer/orders',
        config
      )

      //console.log('datafrom order', response.data.order)
      if (response.data.success) {
        return { isHasData: true, listOrders: response.data.order }
      }
    } catch (err) {
      console.log(err)
    }
  },
  layout: 'dashboard',
}
</script>
