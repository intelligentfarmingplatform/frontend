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
            <h3>บัตรเครดิตของฉัน</h3>
          </v-row>
        </v-col>
        <v-col md="1" offset-md="6">
          <v-row outlined tile>
            <v-btn depressed color="#00B3CA" @click="addCard = !addCard">
              <h1>+</h1>
              เพิ่มบัตรเครดิต
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-dialog v-model="addCard" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">เพิ่มบัตรเครดิต/บัตรเดบิต</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row ref="formCard">
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="ชื่อที่ปรากฎบนบัตร"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="หมายเลขบัตรเครดิต"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" md="2"
                  ><i class="bx bxl-visa bx-md"></i>
                </v-col>
                <v-col cols="12" sm="2" md="2"
                  ><i class="bx bxl-mastercard bx-md"></i>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="วันหมดอายุ"
                    hint="MM/YY"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="CVV" hint="XXX" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="ที่อยู่ในการวางบิล"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="addCard = false">
              ล้างข้อมูล
            </v-btn>
            <v-btn color="blue darken-1" text @click="addCard = false">
              บันทึก
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import Payment from '~/components/payment.vue'

export default {
  layout: 'dashboard',
  data: () => ({
    addCard: false,
  }),
}
</script>
