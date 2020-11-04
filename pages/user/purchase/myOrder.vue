<template>
  <v-containe fluid grid-list-xl fill-height>
    <v-layout justify-center align-center>
      <div v-if="!isHasData">
        <v-img max-height="100%" max-width="100%" src="/clipboards.png"></v-img>
        <h4>ยังไม่มีการสั่งซื้อ</h4>
      </div>
      <div v-if="isHasData">
        <template>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Calories</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in listOrders.products" :key="item._id">
                  <td>{{ item }}</td>
                  <td>{{ item.calories }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
      </div>
    </v-layout>
  </v-containe>
</template>

<script>
import Axios from 'axios'
export default {
  data: () => ({
    listOrders: '',
    isHasData: false,
  }),
  async fetch() {
    await this.$axios
      .get('https://it-ifp-auth.herokuapp.com/api/orders')
      .then((response) => {
        this.Loaded = false
        console.log('datafrom order', response.data.message)
        if (response.data.success) {
          this.isHasData = true
          this.listOrders = response.data.message
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  layout: 'dashboard',
}
</script>
s
