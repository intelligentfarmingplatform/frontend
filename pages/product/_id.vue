<template>
  <div class="container">
    <div class="inner">
      <section class="item-contain">
        <section class="img">
          <img
            :src="`http://maims.cmtc.ac.th:3000/product/${product.productimg}`"
            height="400"
          />
        </section>
        <section class="product-info">
          <h3>{{ product.productname }}</h3>
          <h4 class="price">{{ product.productprice }} บาท</h4>
          <p>{{ product.productdetail }}</p>
          <p>ทดสอบๆ</p>
          <div class="product-options">
            <div class="quantity">
              <vs-button
                size="mini"
                class="update-num"
                @click="quantity > 0 ? quantity-- : (quantity = 0)"
                ><i class="bx bx-minus"></i
              ></vs-button>
              <input type="number" v-model="quantity" />
              <vs-button size="mini" class="update-num" @click="quantity++"
                ><i class="bx bx-plus"></i
              ></vs-button>
            </div>
          </div>
          <p>เหลือ : {{ product.productnumber }} ชิ้น</p>
          <p>
            <vs-button
              v-if="$auth.loggedIn"
              border
              class="button purchase"
              @click="cartAdd"
              >หยิบใส่ตะกร้า</vs-button
            >
            <vs-button
              border
              class="button purchase"
              @click="loginActive = !loginActive"
              v-if="!$auth.loggedIn"
              >กรุณาล็อคอินเพื่อเลือกสินค้า</vs-button
            >
          </p>
        </section>
      </section>
    </div>

    <div class="inner">
      <div class="review">
        <h2>Reviews</h2>
        <!-- maybe an image of a person? -->

        <p>ทดสอบๆ</p>
      </div>
    </div>
    <AppFeaturedProducts />
    <vs-dialog prevent-close blur v-model="loginActive">
      <template #header>
        <h4 class="not-margin">
          <b>เข้าสู่ระบบ</b>
        </h4>
      </template>

      <div class="con-form">
        <vs-input
          v-model="email"
          placeholder="Email"
          :rules="emailRules"
          label-placeholder="Email"
        >
        </vs-input>

        <vs-input
          type="password"
          v-model="password"
          placeholder="Password"
          label-placeholder="Password"
          :visiblePassword="hasVisiblePassword"
          icon-after
          @click-icon="hasVisiblePassword = !hasVisiblePassword"
        >
          <template #icon>
            <i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
            <i v-else class="bx bx-hide"></i>
          </template>
        </vs-input>
        <div class="flex">
          <vs-checkbox v-model="remember">จดจำฉันไว้</vs-checkbox>
          <a href="#">ลืมรหัสผ่าน?</a>
        </div>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button ref="login" block @click="handleLoginClicked">
            Log in
          </vs-button>

          <div class="new">
            ยังไม่มีบัญชีผู้ใช้งาน?
            <a
              href="#"
              @click="
                ;(registerActive = !registerActive),
                  (loginActive = !loginActive)
              "
              >สร้างบัญชีผู้ใช้งานใหม่</a
            >
          </div>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog prevent-close v-model="registerActive">
      <template #header>
        <h4 class="not-margin">
          <b>สร้างบัญชีผู้ใช้งานใหม่</b>
        </h4>
      </template>

      <div class="con-form">
        <vs-input v-model="usernameRegister" placeholder="Username">
          <template #icon> @ </template>
        </vs-input>
        <vs-input v-model="emailRegister" placeholder="Email">
          <template #icon> @ </template>
        </vs-input>
        <vs-input
          type="password"
          v-model="passwordRegister"
          placeholder="Password"
          label-placeholder="Password"
          :progress="getProgress"
          :visiblePassword="hasVisiblePasswordRegister"
          icon-after
          @click-icon="hasVisiblePasswordRegister = !hasVisiblePasswordRegister"
        >
          <template #icon>
            <i v-if="!hasVisiblePasswordRegister" class="bx bx-show-alt"></i>
            <i v-else class="bx bx-hide"></i>
          </template>
          <template v-if="getProgress >= 100" #message-success>
            รหัสผ่านมีความปลอดภัยสูงสุด
          </template>
          <template v-else-if="getProgress >= 80" #message-success>
            รหัสผ่านมีความปลอดภัยสูง
          </template>
          <template v-else-if="getProgress >= 60" #message-warn>
            รหัสผ่านมีความปลอดภัยปานกลาง
          </template>
          <template v-else-if="getProgress >= 40" #message-warn>
            รหัสผ่านมีความปลอดภัยปานกลาง
          </template>
          <template v-else-if="getProgress >= 20" #message-danger>
            รหัสผ่านมีความปลอดภัยต่ำ
          </template>
        </vs-input>
        <vs-input
          type="password"
          v-model="passwordRegisterConfirm"
          placeholder="Password Confirm"
          :visiblePassword="hasVisiblePasswordRegisterConfirm"
          icon-after
          @click-icon="
            hasVisiblePasswordRegisterConfirm = !hasVisiblePasswordRegisterConfirm
          "
        >
          <template #icon>
            <i v-if="!hasVisiblePasswordRegister" class="bx bx-show-alt"></i>
            <i v-else class="bx bx-hide"></i>
          </template>

          <template
            v-if="
              passwordRegister == passwordRegisterConfirm && passwordRegister
            "
            #message-success
          >
            รหัสผ่านตรงกัน
          </template>

          <template
            v-else-if="passwordRegisterConfirm != passwordRegister"
            #message-danger
          >
            รหัสผ่านไม่ตรงกัน
          </template>
        </vs-input>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block @click="handleRegisterClicked">
            สมัครสมาชิก
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import loginMixin from '~/mixins/login'
import AppFeaturedProducts from '~/components/AppFeaturedProducts.vue'

export default {
  mixins: [loginMixin],
  components: {
    AppFeaturedProducts,
  },
  data() {
    return {
      id: this.$route.params.id,

      quantity: 1,
      showSizeRequiredMessage: false,
      tempcart: [], // this object should be the same as the json store object, with additional params, quantity and size
    }
  },
  async fetch({ store, params }) {
    //return this.getProduct()
    await store.dispatch('loadAllProducts')
  },
  computed: {
    ...mapState(['products']),
    product() {
      return this.products.find((p) => p.id == this.$route.params.id)
      console.log(product)
    },
    //storedata: (state) => state.storedata,
  },
  methods: {
    // ...mapActions({
    //   getProduct: 'getProduct',

    // }),
    cartAdd() {
      let item = this.product
      item = {
        ...item,
        quantity: this.quantity,
        size: this.size,
      }
      this.tempcart.push(item)
      this.$store.commit('addToCart', { ...item })
    },
  },
}
</script>

<style lang="scss" scoped>
.inner {
  padding-top: 10px;
  background-color: white;
}

.product-options {
  display: grid;
}

.product-info {
  padding-left: 15px;
}

input,
select {
  width: 60px;
  font-size: 25px;
  margin: 0 5px;
  padding: 5px 10px;
}

.update-num {
  background: black;
  border-color: black;
  color: white;
  font-size: 20px;
  width: 45px;
}

.size {
  margin-left: 10px;
}

.size-required-message {
  color: red;
}

@media screen and (min-width: 700px) {
  //PC
  .item-contain {
    margin-top: 75px;
    margin-left: 15%;
    margin-bottom: 25px;
    width: 80%;
    display: grid;
    justify-content: space-around;
    grid-template-columns: 1fr 2fr;
  }
  .quantity {
    margin: 10px 0px;
    display: flex;
  }
  .img img {
    width: 300;
    height: 300;
  }
  .review {
    width: 90%;
    margin-left: 4%;
  }
}

@media screen and (max-width: 699px) {
  //Mobile
  .item-contain {
    margin-top: 75px;
    margin-left: 8%;
    width: 75%;
  }
  .quantity {
    display: flex;
  }
  .img img {
    height: 150px;
  }
  .review {
    width: 90%;
    margin-left: 4%;
  }
}

// @media screen and (max-width: 650px) {
//   .img img {
//     width: 100%;
//   }

//   .item-contain {
//     margin-left: 0 !important;
//     width: 95% !important;
//   }

//   .review {
//     width: 90%;
//     margin-left: 4%;
//   }
// }
</style>

<style scoped>
h3 {
  word-wrap: break-word;
}
</style>
