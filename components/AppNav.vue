<template>
  <div class="Nav">
    <vs-navbar
      color="#00B3CA"
      text-white
      shadow
      shadowScroll
      square
      not-line
      leftCollapsed
      fixed
      v-model="active"
    >
      <template #left>
        <h3>Modern Agricultural Industry</h3>
      </template>
      <template>
        <vs-navbar-item :active="active == 'primary'" id="primary" to="/">
          Home
        </vs-navbar-item>
        <vs-navbar-item
          :active="active == 'success'"
          id="success"
          to="/products"
        >
          Product
        </vs-navbar-item>
        <!-- <vs-navbar-item
          :active="active == 'danger'"
          id="danger"
          to="/about"
        >
          About
        </vs-navbar-item> -->
        <!-- <vs-navbar-item @click="contactActive = !contactActive">
          Contact Us
        </vs-navbar-item> -->
      </template>

      <template #right>
        <!-- <vs-navbar-group> -->
        <vs-avatar badge>
          <nuxt-link to="/cart"><img src="/cart.png" alt="#" /></nuxt-link>
          <template #badge>
            {{ cartCount }}
          </template>
        </vs-avatar>
        <!-- <template #items>
            <MiniCart />
          </template>
        </vs-navbar-group> -->
        <vs-button @click="loginActive = !loginActive" v-if="!$auth.loggedIn"
          >Login / Register</vs-button
        >
        <vs-navbar-group>
          <vs-avatar v-if="$auth.loggedIn" style="margin-right: 70px">
            <img src="/avatar.png" alt="" />
          </vs-avatar>
          <template #items>
            <vs-navbar-item
              :active="active == 'MyAccount'"
              id="MyAccount"
              to="/user/account/user-profile"
            >
              บัญชีของฉัน
            </vs-navbar-item>
            <vs-navbar-item
              :active="active == 'MyOrder'"
              id="MyOrder"
              to="/user/purchase/myOrder"
            >
              การสั่งซื้อของฉัน
            </vs-navbar-item>
            <vs-navbar-item
              :active="active == 'Logout'"
              id="Logout"
              @click="logoutHandle"
              v-if="$auth.loggedIn"
            >
              ออกจากระบบ
            </vs-navbar-item>
          </template>
        </vs-navbar-group>
        <!-- <vs-button @click="logoutHandle" v-if="$auth.loggedIn"
          >Logout</vs-button
        > -->
        <!-- <vs-button v-if="$auth.loggedIn">Welcome {{$auth.$state.user.email}}</vs-button> -->
      </template>
    </vs-navbar>

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
          <vs-button ref="login" block @click="handleFacebookLogin">
            Facebook Login
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
import loginMixin from '~/mixins/login'
//import MiniCart from '~/components/MiniCart'
import materialCard from '~/components/material/AppCard'
import Notification from '~/components/Notification'

export default {
  mixins: [loginMixin],
  components: { materialCard, Notification },
}
</script>

<style lang="stylus">
getColor(vsColor, alpha = 1) {
  unquote('rgba(var(--vs-' + vsColor + '), ' + alpha + ')');
}

getVar(var) {
  unquote('var(--vs-' + var + ')');
}

.Nav {
  margin: auto;
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
