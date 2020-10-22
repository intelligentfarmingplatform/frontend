<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card
          color="green"
          title="Edit Profile"
          text="Complete your profile"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md4>
                  <v-text-field label="Company (disabled)" disabled />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="username"
                    class="purple-input"
                    label="User Name"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="email"
                    label="Email Address"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="First Name" class="purple-input" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Last Name" class="purple-input" />
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field label="Adress" class="purple-input" />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="City" class="purple-input" />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="Country" class="purple-input" />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    class="purple-input"
                    label="Postal Code"
                    type="number"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-select
                    :items="provincesData"
                    item-text="name_th"
                    item-value="id"
                    v-model="provincesid"
                    label="จังหวัด"
                    :disabled="provincesDisabled"
                    v-on:change="handleProvinces"
                    return-object
                    prepend-icon="mdi-flag"
                    outlined
                  ></v-select>
                </v-flex>
                <v-flex xs12 md6>
                  <v-select
                    :items="amphuresData"
                    item-text="name_th"
                    item-value="id"
                    v-model="amphuresid"
                    label="อำเภอ"
                    :disabled="amphuresDisabled"
                    v-on:change="handleAmphures"
                    return-object
                    prepend-icon="mdi-flag"
                    outlined
                  ></v-select>
                </v-flex>
                <v-flex xs12 md6>
                  <v-select
                    :items="districtsData"
                    item-text="name_th"
                    item-value="id"
                    label="ตำบล"
                    :disabled="districtsDisabled"
                    v-model="districtsid"
                    v-on:change="handleDistricts"
                    prepend-icon="mdi-flag"
                    return-object
                    outlined
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="About Me"
                    :value="address"
                  />
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" color="success">
                    Update Profile
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
              {{ user.function }}
            </h6>
            <h4 class="card-title font-weight-light">{{ fullname }}</h4>
            <p class="card-description font-weight-light">
              {{ user.description }}
            </p>
            <blockquote class="blockquote">{{ user.citation }}</blockquote>
            <v-btn color="success" rounded class="font-weight-light"
              >Follow</v-btn
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
      username: '555',
      provincesDisabled: false,
      amphuresDisabled: true,
      districtsDisabled: true,
      email: '333',
      f_name: '',
      l_name: '',
      address: [],
      item2: null,
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      fullname: 'user/getFullname',
    }),
  },
}
</script>
