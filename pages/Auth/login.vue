<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <material-card
            color="success"
            elevation="12"
            title="เข้าสู่ระบบ"
          >
            <v-card-text>
              <v-form>
                <v-text-field type="email" v-model="email" prepend-icon="mdi-account" name="email" label="Login"></v-text-field>
                <v-text-field type="password" v-model="password" prepend-icon="mdi-lock" name="password" label="Password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-layout justify-center align-center>
                <v-btn color="success" @click="handleLoginClicked">Login</v-btn>
              </v-layout>
            </v-card-actions>
          </material-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
 import { mapGetters } from 'vuex'
  import materialCard  from '~/components/material/AppCard'

  export default {
      computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
    layout:'auth',
    components: {
      materialCard
    },
    data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleLoginClicked() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: { email: this.email, password: this.password  }
        })
        console.log(response)
        if (response.data.success) {
          this.$router.push({ path: '/admin/dashboard' })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  }
</script>

