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
        <v-col md="4">
          <v-row class="pa-2" outlined tile>
            <h3>ที่อยู่ของฉัน</h3>
          </v-row>
        </v-col>
        <v-col md="1" offset-md="6">
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
          <v-card-text>
            <v-container>
              <v-row ref="formAddress">
                <v-col cols="12" sm="6" md="12">
                  <v-text-field label="ชื่อ-นามสกุล" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="ตำบล" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="อำเภอ" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="จังหวัด" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="อาคาร , ถนน ฯลฯ" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="รหัสไปรษณีย์"
                    type=""
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
            <v-btn color="blue darken-1" text @click="addAddress = false">
              บันทึก
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  data: () => ({
    addAddress: false,
  }),
  methods: {
    reset() {
      this.$refs.formAddress.reset()
    },
  },
}
</script>
