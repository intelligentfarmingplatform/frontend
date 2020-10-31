<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card
          color="green"
          title="แก้ไขโปรไฟล์"
          text="แก้ไขข้อมูลโปรไฟล์ของคุณ"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md4>
                  <v-text-field label="บริษัท (disabled)" disabled />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="username"
                    class="purple-input"
                    label="ชื่อผู้ใช้งาน"
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
                  <v-text-field
                    v-model="email"
                    label="ที่อยู่อีเมล"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="ชื่อ" class="purple-input" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="นามสกุล" class="purple-input" />
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field label="ที่อยู่" class="purple-input" />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="ตำบล" class="purple-input" />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="อำเภอ" class="purple-input" />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="จังหวัด" class="purple-input" />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    class="purple-input"
                    label="รหัสไปรษณีย์"
                    type="number"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="เกี่ยวกับฉัน"
                    :value="address"
                  />
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" color="success">
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
            <h6 class="category text-gray font-weight-thin mb-3">
              
            </h6>
            <h4 class="card-title font-weight-light"></h4>
            <p class="card-description font-weight-light">
              
            </p>
            <blockquote class="blockquote"></blockquote>
            <v-btn color="success" rounded class="font-weight-light"
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
  data() {
    return {
      testdata: [],
      username: this.$auth.$state.user.username,
      provincesDisabled: false,
      amphuresDisabled: true,
      districtsDisabled: true,
      email: this.$auth.$state.user.email,
      f_name: '',
      l_name: '',
      address: [],
      item2: null,
    }
  },
  computed: {},
}
</script>
