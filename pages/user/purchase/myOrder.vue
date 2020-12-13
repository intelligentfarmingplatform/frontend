<template>
  <v-container fluid grid-list-xl fill-height>
      <v-data-table
    :items="listOrders"
    :items-per-page="5"
    class="elevation-1"
  >
        <template
        v-slot:header="{ props: { headers } }"
      >
        <thead>
          <tr>
            <th 
            v-for="headers in header" :key="headers.id"
            :colspan="headers.length">
              {{headers.name}}
            </th>
          </tr>
        </thead>
      </template>
       <template
        v-slot:body="{ items }"
      >
        <tbody>
          <tr
            v-for="item in items"
            :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td>CONTENT</td>
            <td>CONTENT</td>
            <td>CONTENT</td>
            <td>CONTENT</td>
            <td>CONTENT</td>
          </tr>
        </tbody>
      </template>

      <template
        v-slot:no-data
      >
        NO DATA HERE!
      </template>
  </v-data-table>
  </v-container>
</template>

<script>
import Axios from 'axios'
export default {
  data: () => ({
    listOrderItems: [],
    isHasData: false,
    header:[
      {name:'ลำดับ'},
      {name:'รห้สสั่งซื้อ'},
      {name:'จำนวนสินค้า'},
      {name:'ราคา'},
      {name:'สถานะ'},
      {name:'ลำดับ'},
      {name:'ลำดับ'},
    ],
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
        'http://localhost:3000/api/customer/orders',
        config
      )

      //console.log('datafrom order', response.data.order)
      if (response.data.success) {
        return { isHasData: true, listOrders: response.data.order,listOrderItems: response.data.orderItem }
      }
    } catch (err) {
      console.log(err)
    }
  },
  layout: 'dashboard',
}
</script>
<style lang="scss" scoped>
.v-data-table{
  width: 100%;
}
</style>
