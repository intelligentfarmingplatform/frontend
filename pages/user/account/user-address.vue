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

      <!-- Add Address -->
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed color="info" v-bind="attrs" v-on="on">
            <v-icon> mdi-plus </v-icon>
            เพิ่มที่อยู่
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
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
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      prepend-inner-icon="mdi-phone"
                      label="เบอร์โทรศัพท์ที่ติดต่อได้"
                      v-model="addressForm.phoneNumber"
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
              <v-btn color="blue darken-1" text @click="save"> บันทึก </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="headline"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-col md="12" cols="12">
      <v-data-table
        :headers="dessertHeaders"
        :items="address"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="id"
        show-expand
        class="elevation-1"
        :loading="loading"
        loading-text="กำลังโหลดข้อมูล..."
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Your Address</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn depressed color="#00B3CA" @click="dialog = !dialog">
              <h2>+</h2>
              เพิ่มที่อยู่
            </v-btn> -->
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">More info about</td>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-1" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small class="mr-1" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
          <v-icon small @click="setDefault(item)"> mdi-home</v-icon>
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
    dialogDelete: false,
    AddEdit: '',
    addressForm: {
      fullName: '',
      district: '',
      province: '',
      zipCode: '',
      streetAddress: '',
      phoneNumber: '',
    },
    defaultAddressForm: {
      fullName: '',
      district: '',
      province: '',
      zipCode: '',
      streetAddress: '',
      phoneNumber: '',
    },

    expanded: [],
    singleExpand: false,
    dessertHeaders: [
      { text: 'ชื่อ-นามสกุล', value: 'fullName' },
      { text: 'ที่อยู่', value: 'streetAddress' },
      { text: 'อำเภอ', value: 'district' },
      { text: 'จังหวัด', value: 'province' },
      { text: 'รหัสไปรษณีย์', value: 'zipCode' },
      { text: 'เบอร์โทรศัพท์', value: 'phoneNumber' },
      { text: 'Actions', value: 'actions', sortable: false },
      { text: '', value: 'data-table-expand' },
    ],
    loading: true,
    address: [],
    dialog: false,
    editedIndex: -1,
  }),
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
        'http://localhost:3000/api/customer/address',
        config
      )
      const [addressResponse] = await Promise.all([response])
      console.log('datafrom order', addressResponse.data)
      if (!addressResponse.data.success) {
        return { loading: false }
      }
      if (addressResponse.data.success) {
        return { address: addressResponse.data.address, loading: false }
      }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    reset() {
      this.$refs.formAddress.reset()
    },
    editItem(item) {
      this.editedIndex = this.address.indexOf(item)
      this.addressForm = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.address.indexOf(item)
      this.addressForm = Object.assign({}, item)
      this.dialogDelete = true
    },
    async setDefault(item) {
      const config = {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      }
      try {
        let onSetDefault = await Axios.put(
          `http://localhost:3000/api/customer/address/set/${item.id}/default`,'',
          config
        )
        if (onSetDefault.data.success) {
          const noti = this.$vs.notification({
            position: 'top-center',
            icon: `<i class='bx bx-bell' ></i>`,
            color: 'success',
            width: '100%',
            title: '<center>' + onSetDefault.data.message + '</center>',
            text: `<center>กรุณารอสักครู่...</center>`,
          })
        }
      } catch (err) {}
      console.log(item.id)
    },

    async deleteItemConfirm() {
      const config = {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      }
      try {
        let deleteAddress = await Axios.delete(
          `http://localhost:3000/api/customer/address/${this.addressForm.id}`,
          config
        )
        if (deleteAddress.data.success) {
          this.address.splice(this.editedIndex, 1)
          this.closeDelete()
          const noti = this.$vs.notification({
            position: 'top-center',
            icon: `<i class='bx bx-bell' ></i>`,
            color: 'success',
            width: '100%',
            title: '<center>ลบที่อยู่สำเร็จ</center>',
            text: `<center>กรุณารอสักครู่...</center>`,
          })
        }
      } catch (err) {
        if ((this.error = err.deleteAddress.data.success === false)) {
          const noti = this.$vs.notification({
            position: 'top-center',
            color: 'danger',
            width: '100%',
            title: '<center>เกิดข้อผิดพลาด</center>',
            text: '<center>' + err.deleteAddress.data.message + '</center>',
          })
        }
      }
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultAddressForm)
        this.editedIndex = -1
      })
    },
    async save() {
      const config = {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      }
      if (this.editedIndex > -1) {
        try {
          let response = await Axios.put(
            `http://localhost:3000/api/customer/address/${this.addressForm.id}`,
            {
              fullName: this.addressForm.fullName,
              district: this.addressForm.district,
              province: this.addressForm.province,
              zipCode: this.addressForm.zipCode,
              streetAddress: this.addressForm.streetAddress,
              phoneNumber: this.addressForm.phoneNumber,
            },
            config
          )
          if (response.data.success) {
            Object.assign(this.address[this.editedIndex], this.addressForm)
            this.$refs.formAddress.reset()
            this.dialog = false
            const noti = this.$vs.notification({
              position: 'top-center',
              icon: `<i class='bx bx-bell' ></i>`,
              color: 'success',
              width: '100%',
              title: '<center>แก้ไขที่อยู่สำเร็จ</center>',
              text: `<center>กรุณารอสักครู่...</center>`,
            })
          }
        } catch (err) {
          if ((this.error = err.response.data.success === false)) {
            const noti = this.$vs.notification({
              position: 'top-center',
              color: 'danger',
              width: '100%',
              title: '<center>เกิดข้อผิดพลาด</center>',
              text: '<center>' + err.response.data.message + '</center>',
            })
          }
        }
      } else {
        try {
          let response = await Axios.post(
            'http://localhost:3000/api/customer/address',
            this.addressForm,
            config
          )
          console.log('datafrom add address', response.data.success)
          if (response.data.success) {
            this.address.push(response.data.data)
            this.$refs.formAddress.reset()
            this.dialog = false
            const noti = this.$vs.notification({
              position: 'top-center',
              icon: `<i class='bx bx-bell' ></i>`,
              color: 'success',
              width: '100%',
              title: '<center>เพิ่มที่อยู่สำเร็จ</center>',
              text: `<center>กรุณารอสักครู่...</center>`,
            })
          }
        } catch (err) {
          if ((this.error = err.response.data.success === false)) {
            const noti = this.$vs.notification({
              position: 'top-center',
              color: 'danger',
              width: '100%',
              title: '<center>เกิดข้อผิดพลาด</center>',
              text: '<center>' + err.response.data.message + '</center>',
            })
          }
        }
      }
    },
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'ที่อยู่ของฉัน' : 'แก้ไขที่อยู่'
    },
  },
}
</script>
