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
        <v-col class="mb-6" offset-md="6">
          <v-row outlined tile>
            <v-btn depressed color="#00B3CA" @click="addAddress = !addAddress">
              <h2>+</h2>
              เพิ่มที่อยู่
            </v-btn>
          </v-row>
        </v-col>
      </v-row>

      <v-dialog v-model="addAddress" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">ที่อยู่ในการจัดส่ง</span>
          </v-card-title>
          <v-form ref="formAddress">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field label="ชื่อ-นามสกุล" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="อำเภอ" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="จังหวัด" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="รหัสไปรษณีย์"
                      type=""
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      label="อาคาร , ถนน ฯลฯ"
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
                @click="reset(), (addAddress = false)"
              >
                ยกเลิก
              </v-btn>
              <v-btn color="blue darken-1" text @click="addAddress = false">
                บันทึก
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-col md="12" cols="12">
      <v-row class="pa-2" outlined tile>
        <v-card
          max-width="100%"
          outlined
          v-for="item in address"
          :key="item._id"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{ item.fullName }}</div>
              <v-list-item-title class="headline mb-1">
                {{ item.streetAddress }}
                {{ item.district }}
                {{ item.province }}
                {{ item.zipCode }}
                {{ item.phoneNumber }}
                {{ item.note }}
              </v-list-item-title>
              <!-- <v-list-item-subtitle
                >Greyhound divisely hello coldly
                fonwderfully</v-list-item-subtitle
              > -->
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text> Button </v-btn>
          </v-card-actions>
          
        </v-card>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import Axios from 'axios'
export default {
  layout: 'dashboard',
  data: () => ({
    address: '',
    addAddress: false,
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
    reset() {
      this.$refs.formAddress.reset()
    },
  },
}
</script>
