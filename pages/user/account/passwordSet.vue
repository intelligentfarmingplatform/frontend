<template>
<v-card-title>
        <div class="haderpeng">
            <span>เปลี่ยนรห้สผ่าน</span><br>
            <span class="subtitle">กรุณาอย่าเปิดเผยรหัสผ่านแก่คนอื่นๆ เพื่อความปลอดภัยของบัญชีผู้ใช้คุณเอง</span>
        </div>
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
        
        </v-card-title>
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
            'http://localhost:3000/api/customer',
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
<style lang="scss" scoped>
    .haderpeng{
      padding: 15px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.11);
      width: 100%;

        .subtitle{
          font-size: 1rem;
        }
    }

    .edit{
      margin: 20px auto;
      font-size: 14px;

      .col-12 {
         text-align: left;
      } 

      .col-md-3{
        text-align: right;
      }
      .haderlist{
        color: #868686;
        font-size: 14px;
      }

      .v-input{
        height: 100%;
        font-size: 14px;
      }

      .v-text-field {
        padding: 0;
        margin: 0;
      }

    .col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1{
      padding: 5px 10px !important;
        }
    }

</style>
