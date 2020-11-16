<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card
          color="#00B3CA"
          title="แก้ไขโปรไฟล์"
          text="แก้ไขข้อมูลโปรไฟล์ของคุณ"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <!-- <v-flex xs12 md4>
                  <v-text-field label="บริษัท (disabled)" disabled />
                </v-flex> -->
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="displayName"
                    class="purple-input"
                    label="Display Name"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="email"
                    label="ที่อยู่อีเมล"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field class="purple-input" label="เบอร์โทรศัพท์" />
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field label="ชื่อ - นามสกุล" class="purple-input" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-select
                    v-model="select"
                    :items="genderItem"
                    item-text="gender"
                    item-value="value"
                    label="เพศ"
                    return-object
                    single-line
                  ></v-select>
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                    @click="updateProfile"
                    class="mx-0 font-weight-light"
                    color="#00B3CA"
                  >
                    อัพเดตโปรไฟล์
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex xs12 md4>
        <material-card class="v-card-profile">
          <v-avatar slot="offset" class="mx-auto d-block" size="130">
            <img
              src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
            />
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">ชื่อผู้ใช้</h6>
            <h4 class="card-title font-weight-light">ชื่อผู้ใช้</h4>
            <p class="card-description font-weight-light">ชื่อผู้ใช้</p>
            <blockquote class="blockquote">ชื่อผู้ใช้</blockquote>
            <v-btn color="#00B3CA" rounded class="font-weight-light"
              >แก้ไขรูปโปรไฟล์</v-btn
            >
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import materialCard from '~/components/material/AppCard'
import Axios from 'axios'

export default {
  layout: 'dashboard',
  components: {
    materialCard,
  },
  methods: {
    async updateProfile() {
      const config = {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      }
      try {
        let onUpdateProfile = await Axios.put(
          `https://intelligentfarmingplatform.herokuapp.com/api/customer/edit/profile`,
          '',
          config
        )
        if (onUpdateProfile.data.success) {
          const noti = this.$vs.notification({
            position: 'top-center',
            icon: `<i class='bx bx-bell' ></i>`,
            color: 'success',
            width: '100%',
            title: '<center>' + onUpdateProfile.data.message + '</center>',
            text: `<center>กรุณารอสักครู่...</center>`,
          })
        }
      } catch (err) {
        if ((this.error = err.onUpdateProfile.data.success === false)) {
          const noti = this.$vs.notification({
            position: 'top-center',
            color: 'danger',
            width: '100%',
            title: '<center>เกิดข้อผิดพลาด</center>',
            text: '<center>' + err.onUpdateProfile.data.message + '</center>',
          })
        }
      }
    },
  },
  data() {
    return {
      username: this.$auth.$state.user.username,
      displayName: '',
      email: this.$auth.$state.user.email,
      fullName: '',
      phoneNumber: '',
      select: { gender: '', value: '' },
      genderItem: [
        { gender: 'ชาย', value: '1' },
        { gender: 'หญิง', value: '2' },
        { gender: 'อื่น ๆ', value: '3' },
      ],
    }
  },
  computed: {},
}
</script>
