<template>
  <section>
    <form-wizard @on-complete="onPurchase">
      <tab-content title="ตะกร้าสินค้า" icon="bx bx-cart" class="mb-5">
        <hr />
        <h3 class="center">ตะกร้าสินค้า</h3>
        <AppCartDisplay />
      </tab-content>
      <tab-content title="ข้อมูลที่อยู่สำหรับการจัดส่ง" icon="bx bx-home">
        <hr />
        <h3 class="center">ข้อมูลที่อยู่สำหรับการจัดส่ง</h3>
        <vs-button
          @click="active = !active"
          v-if="
            $auth.loggedIn &&
            this.$auth.$state.user.CustomerAddresses.length == 0
          "
          >เพิ่มที่อยู่</vs-button
        >
        <vs-dialog blur v-model="active">
          <template #header>
            <h4 class="not-margin">Welcome to <b>Vuesax</b></h4>
          </template>

          <div class="con-form">
            <vs-input v-model="input1" placeholder="Email">
              <template #icon> @ </template>
            </vs-input>
            <vs-input type="password" v-model="input2" placeholder="Password">
              <template #icon>
                <i class="bx bxs-lock"></i>
              </template>
            </vs-input>
            <div class="flex">
              <vs-checkbox v-model="checkbox1">Remember me</vs-checkbox>
              <a href="#">Forgot Password?</a>
            </div>
          </div>

          <template #footer>
            <div class="footer-dialog">
              <vs-button block> Sign In </vs-button>

              <div class="new">
                New Here? <a href="#">Create New Account</a>
              </div>
            </div>
          </template>
        </vs-dialog>
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
    </form-wizard>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import AppCartDisplay from '~/components/AppCartDisplay.vue'
import orderMixin from '~/mixins/order'
export default {
  mixins: [orderMixin],
  components: {
    AppCartDisplay,
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
    ...mapState(['cartUIStatus']),
    ...mapGetters(['cartCount']),
  },
  methods: {
    onComplete: function () {
      alert('Yay. Done!')
    },
  },
}
</script>

<style lang="scss" scoped>
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
