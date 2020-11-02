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
              <v-text-field label="รหัสผ่านใหม่" class="input" color="#00B3CA"/>
            </v-flex>
            <v-flex xs12 md6 />
            <v-flex xs12 md6>
              <v-text-field label="ยืนยันรหัสผ่าน" class="input" color="#00B3CA"/>
            </v-flex>
            <v-flex xs12 md6 />
            <v-flex xs12 md6>
              <v-text-field label="รหัสการตรวจสอบ" class="input" color="#00B3CA" />
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
}
</script>
