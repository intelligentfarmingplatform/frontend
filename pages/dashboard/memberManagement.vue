<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12 lg12>
        <material-card color="#00B3CA" title="Member" text="Member Manage">
          <v-data-table
            :headers="headers"
            :items="listusers"
            loader-height="2px"
            loading-text="Loading... Please wait"
          >
            <template slot="headerCell" slot-scope="{ header }">
              <span
                class="font-weight-light text-warning text--darken-3"
                v-text="header.text"
              />
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.id }}</td>
              <td class="text-center">{{ item.userName }}</td>
              <td>{{ item.password }}</td>
              <td class="text-center">{{ item.email }}</td>
              <td>{{ item.status_level }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import materialCard from '~/components/material/AppCard'
import Axios from 'axios'
export default {
  layout: 'dashboard',
  components: {
    materialCard,
  },
  data() {
    return {
      headers: [
        { text: 'รห้ส', value: 'id', width: 10 },
        { text: 'ชื่อผู้ใช้', value: 'userName' },
        { text: 'รห้ส', value: 'password' },
        { text: 'อีเมล์', value: 'email' },
        {
          text: 'สถานะ',
          align: 'center',
          sortable: false,
          value: 'status_level',
          width: '15%',
        },
      ],
      listusers: [],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false,
      },
    }
  },
  async fetch() {
    await Axios.get('http://maims.cmtc.ac.th:3000/api/user')
      .then((response) => {
        this.listusers = response.data.data
        console.log('Dataload', this.listusers[0])
        this.loading = false
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index]
    },
  },
}
</script>
