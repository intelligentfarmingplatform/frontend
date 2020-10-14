<template>
  <div class="center examplex">
    <vs-navbar color="#32CD32" text-white center-collapsed v-model="active">
      <template #left>
        <h3>Intelligent Farming</h3>
      </template>
      <template>
        <vs-navbar-item :active="active == 'primary'" id="primary" to="/">
          Home
        </vs-navbar-item>
        <vs-navbar-item
          :active="active == 'success'"
          id="success"
          to="/main/products"
        >
          Product
        </vs-navbar-item>
        <vs-navbar-item
          :active="active == 'danger'"
          id="danger"
          to="/main/about"
        >
          About
        </vs-navbar-item>
        <vs-navbar-item @click="contactActive = !contactActive">
          Contact Us
        </vs-navbar-item>
      </template>

      <template #right>
        <vs-navbar-group>
          <vs-avatar badge>
            <nuxt-link to="/main/cart"
              ><img src="/cart.png" alt="#"
            /></nuxt-link>
            <template #badge>
              {{ cartCount }}
            </template>
          </vs-avatar>
          <template #items>
            <MiniCart />
          </template>
        </vs-navbar-group>
        <vs-button @click="loginActive = !loginActive" v-if="!$auth.loggedIn"
          >Login</vs-button
        >
        <vs-button @click="openNotification('top-center', '#7d33ff')"
          >User</vs-button
        >
        <vs-button @click="logoutHandle" v-if="$auth.loggedIn"
          >Logout</vs-button
        >
      </template>
    </vs-navbar>
    <vs-dialog prevent-close blur v-model="loginActive">
      <template #header>
        <h4 class="not-margin">
          <b>เช้าสู่ระบบ</b>
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
            <a href="#" @click="registerActive = !registerActive"
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
          @click-icon="hasVisiblePasswordRegisterConfirm = !hasVisiblePasswordRegisterConfirm"
        >

          <template #icon>
            <i v-if="!hasVisiblePasswordRegister" class="bx bx-show-alt"></i>
            <i v-else class="bx bx-hide"></i>
          </template>
                    <template v-if="!passwordRegister" #message-danger>
            รหัสผ่านไม่ตรงกัน
          </template>
            <template v-else-if="passwordRegister" #message-success>
            รหัสผ่านตรงกัน
          </template>
          </vs-input>
                      <vs-input
        v-model="id_cardRegister"
        placeholder="รหัสบัตรประจำตัว 13 หลัก"
      >
        <template #icon> @ </template>
      </vs-input>
      </div>


      <template #footer>
        <div class="footer-dialog">
          <vs-button block> สมัครสมาชิก </vs-button>
        </div>
      </template>
    </vs-dialog>

    <vs-dialog blur prevent-close v-model="contactActive">
      <template #header>
        <h4 class="not-margin">
          <b>ติดต่อเรา</b>
        </h4>
      </template>

      <div class="con-form">
        <vs-input v-model="name" placeholder="ชื่อ">
          <template #icon> @ </template>
        </vs-input>
        <vs-input v-model="lastname" placeholder="นามสกุล">
          <template #icon> @ </template>
        </vs-input>
        <vs-input v-model="email" placeholder="อีเมล">
          <template #icon> @ </template>
        </vs-input>
        <vs-input v-model="phone" placeholder="เบอร์โทรศัพท์">
          <template #icon> @ </template>
        </vs-input>
        <vs-input v-model="message" placeholder="ข้อความ">
          <template #icon> @ </template>
        </vs-input>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block> ยืนยัน </vs-button>

          <div class="new">New Here? <a href="#">Create New Account</a></div>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MiniCart from '~/components/MiniCart'
import materialCard from '~/components/material/AppCard'
import Notification from '~/components/Notification'
import Vue from 'vue'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css'
Vue.use(Vuesax, {})

export default {
  components: { materialCard, Notification, MiniCart },
  data: () => ({
    emailRegister: '',
    passwordRegister: '',
    passwordRegisterConfirm:'',
    usernameRegister: '',
    id_cardRegister: '',
    hasVisiblePassword: false,
    hasVisiblePasswordRegister: false,
    hasVisiblePasswordRegisterConfirm:false,
    active: 'primary',
    loginActive: false,
    registerActive: false,
    email: '',
    password: '',
    passwordRules: [(v) => !!v || 'จำเป็นต้องใส่ Password'],
    emailRules: [
      (v) => !!v || 'จำเป็นต้องใส่ E-mail',
      (v) => /.+@.+\..+/.test(v) || 'รูปแบบบ E-mail ไม่ถูกต้อง',
    ],
    remember: false,
    contactActive: false,
    name: '',
    lastname: '',
    phone: '',
    message: '',
  }),
  created(){
    console.log(this.passwordRegister)
  },
  methods: {
    async logoutHandle() {
      await this.$auth.logout()
      const noti = this.$vs.notification({
        position: 'top-center',
        width: '100%',
        color: 'warn',
        loading: true,
        title: '<center>ออกจากระบบสำเร็จ</center>',
        text: `<center>กำลังนำคุณไปสู่หน้าหลัก...</center>`,
      })
    },
    async handleLoginClicked() {
      console.log('before', this.loginActive)
      try {
        const response = await this.$auth.loginWith('local', {
          data: { email: this.email, password: this.password },
        })
        console.log(response.data.success)
        if (response.data.success) {
          this.loginsuccess = response.data.success
          this.loginActive = false
          const noti = this.$vs.notification({
            position: 'top-center',
            icon: `<i class='bx bx-bell' ></i>`,
            color: 'success',
            width: '100%',
            title: '<center>เข้าสู่ระบบสำเร็จ</center>',
            text: `<center>กำลังนำคุณไปสู่หน้าหลัก...</center>`,
          })
          console.log('after', this.loginActive)

          //this.$router.push({ path: '/admin/dashboard' })
        }
      } catch (err) {
        this.loginsuccess = err
        if ((this.error = err.response.data.success === false)) {
          this.error = err.response.data.message
          const noti = this.$vs.notification({
            position: 'top-center',
            color: 'danger',
            width: '100%',
            title: '<center>เกิดข้อผิดพลาด</center>',
            text: '<center>' + err.response.data.message + '</center>',
          })
        } else {
          this.error = err.response.data
          const noti = this.$vs.notification({
            position: 'top-center',
            width: '100%',
            color: 'danger',
            title: '<center>เกิดข้อผิดพลาด</center>',
            text: '<center>' + err.response.data + '</center>',
          })
        }
        //console.log(err.response.data.success)
      }
    },
  },
  computed: {
    getProgress() {
      let progress = 0

      // at least one number

      if (/\d/.test(this.passwordRegister)) {
        progress += 20
      }

      // at least one capital letter

      if (/(.*[A-Z].*)/.test(this.passwordRegister)) {
        progress += 20
      }

      // at menons a lowercase

      if (/(.*[a-z].*)/.test(this.passwordRegister)) {
        progress += 20
      }

      // more than 5 digits

      if (this.passwordRegister.length >= 6) {
        progress += 20
      }

      // at least one special character

      if (/[^A-Za-z0-9]/.test(this.passwordRegister)) {
        progress += 20
      }

      return progress
    },
    ...mapGetters(['cartCount']),
  },
}
</script>

<style lang="stylus">
getColor(vsColor, alpha = 1) {
  unquote('rgba(var(--vs-' + vsColor + '), ' + alpha + ')');
}

getVar(var) {
  unquote('var(--vs-' + var + ')');
}

.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
}

.con-form {
  width: 100%;

  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      font-size: 0.8rem;
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }
    }
  }

  .vs-checkbox-label {
    font-size: 0.8rem;
  }

  .vs-input-content {
    margin: 10px 0px;
    width: calc(100%);

    .vs-input {
      width: 100%;
    }
  }
}

.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);

  .new {
    margin: 0px;
    margin-top: 20px;
    padding: 0px;
    font-size: 0.7rem;

    a {
      color: getColor('primary') !important;
      margin-left: 6px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .vs-button {
    margin: 0px;
  }
}
</style>
