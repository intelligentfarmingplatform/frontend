<template>
  <v-container fluid fill-height>
    <v-layout justify-left align-left>
      <v-form>
        <v-container py-0>
          <v-layout wrap>
            <v-flex xs12 md12>
              <h3>ตั้งค่ารหัสผ่าน</h3>
            </v-flex>
            <v-flex xs12 md12>
              <h4>
                *อย่าเปิดเผยรหัสผ่านแก่ผู้อื่น
                เพื่อความปลอดภัยของบัญชีผู้ใช้งานของคุณ
              </h4>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                label="รหัสผ่านใหม่"
                class="input"
                color="#00B3CA"
                type="password"
                v-model="passwordSet"
                :visiblePassword="hasVisiblePasswordSet"
                icon-after
                @click-icon="hasVisiblePasswordSet = !hasVisiblePasswordSet"
              >
                <template #icon>
                  <i v-if="!hasVisiblePasswordSet" class="bx bx-show-alt"></i>
                  <i v-else class="bx bx-hide"></i>
                </template>
              </v-text-field>
              <template v-if="getProgress <= 0"></template>
              <template v-else-if="getProgress <= 20">
                <h6 class="red--text">รหัสผ่านมีความปลอดภัยต่ำ</h6>
              </template>
              <template v-else-if="getProgress <= 40">
                <h6 class="orange--text">รหัสผ่านมีความปลอดภัยปานกลาง</h6>
              </template>
              <template v-else-if="getProgress <= 60">
                <h6 class="orange--text">รหัสผ่านมีความปลอดภัยปานกลาง</h6>
              </template>
              <template v-else-if="getProgress <= 80">
                <h6 class="green--text">รหัสผ่านมีความปลอดภัยสูง</h6>
              </template>
              <template v-else-if="getProgress <= 100">
                <h6 class="green--text">รหัสผ่านมีความปลอดภัยสูงสุด</h6>
              </template>
              <template v-else></template>
            </v-flex>
            <v-flex xs12 md6 />
            <v-flex xs12 md6>
              <v-text-field
                label="ยืนยันรหัสผ่าน"
                color="#00B3CA"
                type="password"
                v-model="passwordSetConfirm"
                :visiblePassword="hasVisiblePasswordSetConfirm"
                :rules="confirmPasswordRules.concat(passwordConfirmationRule())"
                icon-after
                @click-icon="
                  hasVisiblePasswordSetConfirm = !hasVisiblePasswordSetConfirm
                "
                ><template #icon>
                  <i v-if="!hasVisiblePasswordSet" class="bx bx-show-alt"></i>
                  <i v-else class="bx bx-hide"></i>
                </template>
              </v-text-field>
              <template v-if="passwordSet == passwordSetConfirm && passwordSet">
                <h6 class="green--text">รหัสผ่านตรงกัน</h6>
              </template>

              <template v-else-if="passwordSetConfirm != passwordSet">
                <h6 class="red--text">รหัสผ่านไม่ตรงกัน</h6>
              </template>
            </v-flex>
            <v-flex xs12 md6 />
            <v-flex xs12 md6>
              <v-text-field
                label="รหัสการตรวจสอบ"
                class="input"
                color="#00B3CA"
              />
            </v-flex>
            <v-flex xs12 md6>
              <v-btn depressed color="#00B3CA"> รับรหัส OTP </v-btn>
            </v-flex>
            <v-flex xs12 md6>
              <v-btn depressed color="#00B3CA" @click="changePassword">
                ยืนยัน
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  data: () => ({
    confirmPasswordRules: [(v) => !!v || 'Password is required'],
    passwordSet: '',
    passwordSetConfirm: '',
    hasVisiblePasswordSet: false,
    hasVisiblePasswordSetConfirm: false,
    isMatchPassword: false,
  }),
  methods: {
    async changePassword() {
      if (!this.isMatchPassword) {
        const noti = this.$vs.notification({
          position: 'top-center',
          color: 'danger',
          width: '100%',
          title: '<center>เกิดข้อผิดพลาด</center>',
          text: '<center>' + 'รหัสผ่านไม่ตรงกัน' + '</center>',
        })
      } else {
        try {
          const config = {
            headers: {
              Authorization: this.$auth.getToken('local'),
            },
          }
          // this.$axios.setHeader('Authorization', this.$auth.getToken('local'))
          let response = await this.$axios.put(
            'http://127.0.0.1:4000/api/customer',
            { password: this.passwordSetConfirm },
            config
          )
          if (response.data.success) {
            const noti = this.$vs.notification({
              position: 'top-center',
              icon: `<i class='bx bx-bell' ></i>`,
              color: 'success',
              width: '100%',
              title: '<center>เปลี่ยนรหัสผ่านสำเร็จ</center>',
              text: `<center>กรุณาเข้าสู่ระบบใหม่อีกครั้ง...</center>`,
            })
            ;(this.passwordSet = ''), (this.passwordSetConfirm = '')
            await this.$auth.logout()
            if (process.client) {
              localStorage.removeItem('refresh')
              localStorage.removeItem('auth-token')
              localStorage.removeItem('tokenExpiration')
              localStorage.removeItem('userData')
              if (!localStorage.getItem('auth-token')) {
                $nuxt.$router.push('/')
              }
            }
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
    passwordConfirmationRule() {
      if (this.passwordSet === this.passwordSetConfirm && this.passwordSet) {
        this.isMatchPassword = true
      } else {
        this.isMatchPassword = false
      }
      return () => this.passwordSet === this.passwordSetConfirm || ''
    },
    getProgress() {
      let progress = 0

      // at least one number

      if (/\d/.test(this.passwordSet)) {
        progress += 20
      }

      // at least one capital letter

      if (/(.*[A-Z].*)/.test(this.passwordSet)) {
        progress += 20
      }

      // at menons a lowercase

      if (/(.*[a-z].*)/.test(this.passwordSet)) {
        progress += 20
      }

      // more than 5 digits

      if (this.passwordSet.length >= 6) {
        progress += 20
      }

      // at least one special character

      if (/[^A-Za-z0-9]/.test(this.passwordSet)) {
        progress += 20
      }

      return progress
    },
  },
}
</script>
