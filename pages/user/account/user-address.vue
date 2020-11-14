<template>
  <v-container fluid grid-list-xl fill-height>
    <v-layout>
      <v-form>
        <v-container>
          <v-layout wrap>
            <v-flex xs12 md6 py2> </v-flex>
            <v-flex xs12 md6 justify-right align-self-end> </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-row class="mb-6" no-gutters>
        <v-col md="4" cols="6">
          <v-row class="pa-2" outlined tile>
            <h3>ที่อยู่ของฉัน</h3>
          </v-row>
        </v-col>
      </v-row>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">ที่อยู่ในการจัดส่ง</span>
          </v-card-title>
          <v-form ref="formAddress">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      label="ชื่อ-นามสกุล"
                      v-model="addressForm.fullName"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="อำเภอ"
                      v-model="addressForm.district"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="จังหวัด"
                      v-model="addressForm.province"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="รหัสไปรษณีย์"
                      type=""
                      v-model="addressForm.zipCode"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      label="อาคาร , ถนน ฯลฯ"
                      v-model="addressForm.streetAddress"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <h6 text-color="red">
                *กรุณากรอกที่อยู่ให้ครบถ้วนเพื่อความสะดวกในการจัดส่งสินค้า
              </h6>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="reset">
                ล้างข้อมูล
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="reset(), (dialog = false)"
              >
                ยกเลิก
              </v-btn>
              <v-btn color="blue darken-1" text @click="addAddress">
                บันทึก
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-col md="12" cols="12">
      <v-data-table
        :headers="dessertHeaders"
        :items="desserts"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="name"
        show-expand
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Your Address</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn depressed color="#00B3CA" @click="dialog = !dialog">
              <h2>+</h2>
              เพิ่มที่อยู่
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">More info about {{ item.name }}</td>
        </template>
      </v-data-table>
    </v-col>
  </v-container>
</template>

<script>
import Axios from 'axios'
export default {
  layout: 'dashboard',
  data: () => ({
    addressForm: {
      fullName: '',
      district: '',
      province: '',
      zipCode: '',
      streetAddress: '',
    },

    expanded: [],
    singleExpand: false,
    dessertHeaders: [
      {
        text: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' },
      { text: '', value: 'data-table-expand' },
    ],
    desserts: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%',
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8%',
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%',
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0%',
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2%',
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45%',
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
      },
    ],
    address: '',
    dialog: false,
  }),
  async fetch() {
    await Axios.get('https://it-ifp-auth.herokuapp.com/api/addresses', {
      headers: {
        Authorization: this.$auth.getToken('local'),
      },
    })
      .then((response) => {
        this.address = response.data.address
        console.log('Dataload', this.address)
        //this.loading = false
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    async addAddress() {
      try {
        const config = {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        }
         await Axios.post(
          'http://127.0.0.1:4000/api/customer/address',
          this.addressForm
        )
      } catch (err) {}
    },
    reset() {
      this.$refs.formAddress.reset()
    },
  },
}
</script>
