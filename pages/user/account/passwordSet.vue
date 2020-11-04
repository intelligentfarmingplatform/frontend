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
                icon-after
                @click-icon="
                  hasVisiblePasswordSetConfirm = !hasVisiblePasswordSetConfirm
                "
                ><template #icon>
                  <i v-if="!hasVisiblePasswordSet" class="bx bx-show-alt"></i>
                  <i v-else class="bx bx-hide"></i>
                </template>
              </v-text-field>
              <template
                v-if="passwordSet == passwordSetConfirm && passwordSet"
              >
                <h6 class="green--text">รหัสผ่านตรงกัน</h6>
              </template>

              <template
                v-else-if="passwordSetConfirm != passwordSet"
              >
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
              <v-btn depressed color="#00B3CA"> ยืนยัน </v-btn>
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
    passwordSet: '',
    passwordSetConfirm: '',
    hasVisiblePasswordSet: false,
    hasVisiblePasswordSetConfirm: false,
  }),
  computed: {
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
