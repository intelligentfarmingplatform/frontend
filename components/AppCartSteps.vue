<template>
  <section>
    <form-wizard ref="checkoutWizard" :hide-buttons="true">
      <tab-content title="ตะกร้าสินค้า" icon="bx bx-cart" class="mb-5" lazy>
        <hr />

        <div class="checkoutCard">
          <div class="checkoutContent">
            <h3 class="center">ตะกร้าสินค้า</h3>
            <AppCartDisplay />
            <vs-row v-show="!this.$store.state.cart.length"
              ><vs-col w="12">
                <h3 class="center">ยังไม่ได้เลือกสินค้า</h3>
              </vs-col>

              <vs-col w="12">
                <v-btn small color="primary" @click="$router.push('/')"
                  >เลือกดูสินค้า</v-btn
                ></vs-col
              >
            </vs-row>

            <vs-row>
              <vs-col w="12">
                <v-btn
                  small
                  color="primary"
                  v-show="this.$store.state.cart.length"
                  class="w-full"
                  @click="$refs.checkoutWizard.nextTab()"
                  >PLACE ORDER</v-btn
                >
              </vs-col></vs-row
            >
          </div>
        </div>
      </tab-content>
      <tab-content title="ข้อมูลที่อยู่สำหรับการจัดส่ง" icon="bx bx-home">
        <hr />
        <h3 class="center">ข้อมูลที่อยู่สำหรับการจัดส่ง</h3>
        <div>
          <v-row no-gutters>
            <v-col data-app class="d-flex" cols="12" sm="6">
              <v-card outlined rounded>
                <v-card-title>
                  <span class="headline">ข้อมูลที่อยู่สำหรับการจัดส่ง</span>
                </v-card-title>
                <v-form ref="formAddress">
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="12">
                          {{ testdata }}
                          <v-select
                            v-model="select"
                            label="ข้อมูลเดิม"
                            :items="fetchAddress"
                            :disabled="disableForm"
                            item-text="streetAddress"
                            item-value="id"
                            v-on:change="onChooseAddress()"
                          >
                            <template v-slot:selection="data">
                              <!-- HTML that describe how select should render selected items -->
                              {{ data.item.streetAddress }} อ.{{
                                data.item.district
                              }}
                              จ.{{ data.item.province }} {{ data.item.zipCode }}
                            </template>
                            <template v-slot:item="data">
                              <!-- HTML that describe how select should render items when the select is open -->
                              {{ data.item.streetAddress }} อ.{{
                                data.item.district
                              }}
                              จ.{{ data.item.province }} {{ data.item.zipCode }}
                            </template></v-select
                          >
                        </v-col>
                        <v-col cols="12" sm="6" md="12">
                          <v-text-field
                            label="ชื่อ-นามสกุล"
                            v-model="addressForm.fullName"
                            :rules="fullNameRule"
                            required
                            :disabled="disableForm"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="อำเภอ"
                            v-model="addressForm.district"
                            :rules="districtRule"
                            required
                            :disabled="disableForm"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="จังหวัด"
                            v-model="addressForm.province"
                            :rules="provinceRule"
                            required
                            :disabled="disableForm"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="รหัสไปรษณีย์"
                            :rules="numberRule"
                            v-model="addressForm.zipCode"
                            required
                            :disabled="disableForm"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="12">
                          <v-text-field
                            label="อาคาร , ถนน ฯลฯ"
                            v-model="addressForm.streetAddress"
                            :rules="streetAddressRule"
                            required
                            :disabled="disableForm"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="12">
                          <v-text-field
                            prepend-inner-icon="mdi-phone"
                            label="เบอร์โทรศัพท์ที่ติดต่อได้"
                            v-model="addressForm.phoneNumber"
                            :rules="numberRule"
                            required
                            :disabled="disableForm"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="12">
                          <v-text-field
                            prepend-inner-icon="mdi-note"
                            label="Note สำหรับเจ้าหน้าที่จัดส่งสินค้า"
                            v-model="addressForm.noteToDelivery"
                            :rules="noteToDeliveryRule"
                            required
                            :disabled="disableForm"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-checkbox
                            :disabled="disableForm"
                            v-model="addressForm.addToDatabase"
                            :label="`บันทึกไว้ใช้ครั้งต่อไป`"
                          ></v-checkbox>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                          v-show="addressForm.addToDatabase === true"
                        >
                          <v-checkbox
                            :disabled="disableForm"
                            v-model="addressForm.setDefault"
                            :label="`ตั้งค่าให้เป็นค่าเริ่มต้น`"
                          ></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-container>
                    <h6 text-color="red">
                      *กรุณากรอกที่อยู่ให้ครบถ้วนเพื่อความสะดวกในการจัดส่งสินค้า
                    </h6>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      :disabled="disableForm"
                      @click="reset"
                    >
                      ล้างข้อมูล
                    </v-btn>
                    <v-btn
                      :disabled="disableForm"
                      color="primary"
                      @click="addressConfirm = !addressConfirm"
                    >
                      บันทึก
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-col>
            <v-col data-app class="d-flex" cols="12" sm="6">
              <v-card outlined rounded>
                <v-card-title>
                  <span class="headline">ที่อยู่ที่ต้องจัดส่ง</span>
                </v-card-title>
                <!-- อย่าลืมเปลี่ยนให้รับค่าจาก vuex เพราะยังกลับมาใส่ที่อยู่ได้อยู่หลังจาก refresh -->
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        v-show="!saveAddressTrigger"
                        cols="12"
                        sm="6"
                        md="12"
                      >
                        ยังไม่มีข้อมูลที่อยู่
                      </v-col>
                      <v-col
                        v-show="defaultForm.fullName"
                        cols="12"
                        sm="6"
                        md="12"
                      >
                        ชื่อ - นามสกุล
                        {{ defaultForm.fullName }}
                      </v-col>
                      <v-col
                        v-show="defaultForm.streetAddress"
                        cols="12"
                        sm="6"
                        md="12"
                      >
                        {{ defaultForm.streetAddress }}
                        อ.{{ defaultForm.district }} จ.{{
                          defaultForm.province
                        }}
                        รหัสไปรษณีย์
                        {{ defaultForm.zipCode }}</v-col
                      >
                      <v-col
                        v-show="defaultForm.phoneNumber"
                        cols="12"
                        sm="6"
                        md="12"
                      >
                        เบอร์โทรศัพท์ที่ติดต่อได้:
                        {{ defaultForm.phoneNumber }}
                      </v-col>
                      <v-col
                        v-show="defaultForm.noteToDelivery"
                        cols="12"
                        sm="6"
                        md="12"
                      >
                        Note สำหรับเจ้าหน้าที่: {{ defaultForm.noteToDelivery }}
                      </v-col>
                    </v-row>
                  </v-container>
                  <vs-row>
                    <vs-col w="12">
                      <v-btn
                        small
                        color="primary"
                        v-show="this.$store.state.cart.length"
                        class="w-full"
                        :disabled="payBtn"
                        @click="$refs.checkoutWizard.nextTab()"
                        >ชำระเงิน</v-btn
                      >
                    </vs-col></vs-row
                  >
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <p>บัญชีของคุณยังไม่มีที่อยู่</p>
          <v-btn small color="primary" @click="addressConfirm = !addressConfirm"
            >เพิ่มที่อยู่</v-btn
          >
        </div>
      </tab-content>
      <tab-content title="ข้อมูลการชำระเงิน" icon="bx bx-credit-card">
        <hr />
        <h3 class="center">ข้อมูลการชำระเงิน</h3>
        <vs-row align="center" justify="center" class="addressDetail">
          <vs-col w="4"> </vs-col>
          <vs-col w="4">
            <vs-select
              :loading="Loaded"
              v-model="delivery"
              v-on:change="onChooseShipping()"
            >
              <vs-option label="EMS ลงทะเบียน" value="normal">
                EMS ลงทะเบียน
              </vs-option>
              <vs-option label="Kerry Express" value="express">
                Kerry Express
              </vs-option>
            </vs-select>
          </vs-col>
          <vs-col w="4">
            <vs-select
              :loading="Loaded"
              label-placeholder="เลือกบริการขนส่ง"
              v-model="delivery"
              v-on:change="onChooseShipping()"
            >
              <vs-option label="EMS ลงทะเบียน" value="normal">
                EMS ลงทะเบียน
              </vs-option>
              <vs-option label="Kerry Express" value="express">
                Kerry Express
              </vs-option>
            </vs-select>
          </vs-col>
        </vs-row>

        <div>ค่าจัดส่ง {{ this.$store.state.shippingPrice }} บาท</div>
        <div>
          วันที่จะได้รับ {{ this.$store.state.shippingEstimatedDelivery }}
        </div>

        <div>รวมทั้งหมด {{ cartTotalWithShipping }} บาท</div>

        <div ref="card"></div>
        <v-btn
          color="primary"
          elevation="2"
          :disabled="!$auth.loggedIn"
          @click="onPurchase"
          >ยืนยันการสั่งซื้อ</v-btn
        >
      </tab-content>
      <template slot="footer" slot-scope="props">
        <div class="wizard-footer-left">
          <wizard-button
            v-if="props.activeTabIndex > 0 && !props.isLastStep"
            @click.native="props.prevTab()"
            :style="props.fillButtonStyle"
            >Previous</wizard-button
          >
        </div>
        <div class="wizard-footer-right">
          <wizard-button
            v-if="!props.isLastStep"
            @click.native="props.nextTab()"
            class="wizard-footer-right"
            :style="props.fillButtonStyle"
            >Next</wizard-button
          >

          <wizard-button
            v-else
            @click.native="onPurchase"
            class="wizard-footer-right finish-button"
            :style="props.fillButtonStyle"
          >
            {{ props.isLastStep ? 'ชำระเงิน' : 'Next' }}</wizard-button
          >
        </div>
      </template></form-wizard
    >
    <vs-dialog width="550px" blur not-center v-model="addressConfirm">
      <template #header>
        <h4 class="not-margin">
          ต้องการที่จะใช้ที่อยู่นี้ในการจัดส่งใช่หรือไม่ ?
        </h4>
      </template>

      <div class="con-content"></div>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="save" transparent> ตกลง </vs-button>
          <vs-button @click="addressConfirm = false" dark transparent>
            ยกเลิก
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </section>
</template>



<script>
import { mapState, mapGetters } from 'vuex'
import AppCartDisplay from '~/components/AppCartDisplay.vue'
import orderMixin from '~/mixins/order'
export default {
  mixins: [orderMixin],
  components: {
    AppCartDisplay,
  },
  data() {
    return {
      numberRule: [
        (v) => !!v || 'จำเป็นต้องใส่',
        (v) => /^\d+$/.test(v) || 'ต้องเป็นตัวเลขเท่านั้น',
      ],
      fullNameRule: [(v) => !!v || 'จำเป็นต้องใส่'],
      streetAddressRule: [(v) => !!v || 'จำเป็นต้องใส่'],
      noteToDeliveryRule: [(v) => !!v || 'จำเป็นต้องใส่'],
      provinceRule: [(v) => !!v || 'จำเป็นต้องใส่'],
      districtRule: [(v) => !!v || 'จำเป็นต้องใส่'],
      disableForm: false,
      saveAddressTrigger: false,
      fetchAddress: this.$store.state.CustomerAddress,
      select: '',
      payBtn: true,
      defaultForm: {
        fullName: '',
        district: '',
        province: '',
        zipCode: '',
        streetAddress: '',
        phoneNumber: '',
        setDefault: false,
        addToDatabase: false,
        noteToDelivery: '',
      },
      addressForm: {
        fullName: '',
        district: '',
        province: '',
        zipCode: '',
        streetAddress: '',
        phoneNumber: '',
        setDefault: false,
        addToDatabase: false,
        noteToDelivery: '',
      },
    }
  },
  mounted() {
    this.stripe = Stripe(
      'pk_test_51Hg9lmAFMKlS8CSVt1AbCsoCYIz3CFIrcV0tddZirj0H7rnBHxqwv8eOIYDBoygBUTlCdg4axOMnZsLSD6tmXlro009D4jrTF4'
    )
    let elements = this.stripe.elements()
    this.card = elements.create('card')
    // Add an instance of the card Element into the `card-element` <div>
    this.card.mount(this.$refs.card)
    //console.log(this.$auth.getToken('local'))
    if (this.$store.state.shippingPrice) {
      this.Loaded = false
    }
  },
  computed: {
    ...mapState(['cartUIStatus', 'CustomerAddress']),
    ...mapGetters(['cartCount', 'getSelectedAddress']),
    selectAddress() {
      return this.getSelectedAddress.filter((a) => a.id === this.select)
    },
  },
  methods: {
    async onChooseAddress() {
      console.log('testdata', this.selectAddress)
      await (this.addressForm.fullName = this.selectAddress[0].fullName),
        (this.addressForm.district = this.selectAddress[0].district),
        (this.addressForm.province = this.selectAddress[0].province),
        (this.addressForm.streetAddress = this.selectAddress[0].streetAddress),
        (this.addressForm.zipCode = this.selectAddress[0].zipCode),
        (this.addressForm.phoneNumber = this.selectAddress[0].phoneNumber)
    },
    async save() {
      // if (this.$refs.formAddress.validate()) {
        // if(this.$store.state.deliveryAddress){
        //   this.disableForm = true
        // }
        this.addressConfirm = false
        this.saveAddressTrigger = true
        this.payBtn = false
        await (this.defaultForm.fullName = this.addressForm.fullName),
          (this.defaultForm.district = this.addressForm.district),
          (this.defaultForm.province = this.addressForm.province),
          (this.defaultForm.streetAddress = this.addressForm.streetAddress),
          (this.defaultForm.zipCode = this.addressForm.zipCode),
          (this.defaultForm.phoneNumber = this.addressForm.phoneNumber),
          (this.defaultForm.noteToDelivery = this.addressForm.noteToDelivery)
        if (
          this.addressForm.addToDatabase === true &&
          this.$auth.loggedIn === true
        ) {
          const config = {
            headers: {
              Authorization: this.$auth.getToken('local'),
            },
          }
          console.log('save database true')
          await this.$store.commit('setSaveDatabase', {
            addToDatabase: true,
          })
          try {
            let response = await this.$axios.post(
              'http://maims.cmtc.ac.th:3000/api/customer/address',
              {
                fullName: this.defaultForm.fullName,
                streetAddress: this.defaultForm.streetAddress,
                district: this.defaultForm.district,
                province: this.defaultForm.province,
                zipCode: this.defaultForm.zipCode,
                phoneNumber: this.defaultForm.phoneNumber,
              },
              config
            )
            console.log('datafrom add address', response.data.success)
            if (response.data.success) {
              await this.$auth.fetchUser()
              ;(await this.defaultForm.setDefault) === false,
                (await this.defaultForm.addToDatabase) === false,
                (await this.disableForm) === true
              ;(await this.payBtn) === false
              //this.$refs.formAddress.reset()
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
          if (this.addressForm.setDefault === true) {
            console.log('setDefault true')
            await this.$store.commit('setSetDefault', {
              setDefault: true,
            })
          } else {
            await this.$store.commit('setSetDefault', {
              setDefault: false,
            })
            console.log('setDefault false')
          }
        } else {
          await this.$store.commit('setSaveDatabase', {
            addToDatabase: false,
          }),
            await this.$store.commit('setSetDefault', {
              setDefault: false,
            })
        }
        await this.$store.commit('setDeliveryAddress', {
          fullName: this.defaultForm.fullName,
          district: this.defaultForm.district,
          province: this.defaultForm.province,
          streetAddress: this.defaultForm.streetAddress,
          zipCode: this.defaultForm.zipCode,
          phoneNumber: this.defaultForm.phoneNumber,
          noteToDelivery: this.defaultForm.noteToDelivery,
        })
      // } else {
      //   console.log('fail')
      //   this.addressConfirm = false}
    },
    reset() {
      this.$refs.formAddress.reset()
    },
    onComplete: function () {
      alert('Yay. Done!')
    },
  },
}
</script>

<style lang="scss" scoped>
.selectAddress {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  height: 100vh;
  border-radius: 1px;
}
h4 {
  margin-top: 20px;
  color: #555;
}

@media screen and (max-width: 600px) {
  section {
    grid-column-gap: 30px !important;
  }
}
</style>
