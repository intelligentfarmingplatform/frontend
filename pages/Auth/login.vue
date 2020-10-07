<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <material-card color="success" elevation="12" title="เข้าสู่ระบบ">
            <v-card-text>
              <v-form>
                <v-text-field
                  type="email"
                  v-model="email"
                  prepend-icon="person"
                  name="email"
                  label="Email"
                ></v-text-field>
                <v-text-field
                  type="password"
                  v-model="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-layout justify-center align-center>
                <v-btn
                  color="success"
                  @click="handleLoginClicked"
                  >Login</v-btn
                >
              </v-layout>
            </v-card-actions>
          </material-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapActions } from "vuex";
import materialCard from "~/components/material/AppCard";

export default {
  components: {
    materialCard
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async handleLoginClicked() {
      try {
        const response = await this.$auth.loginWith("local", {
          data: { user: { email: this.email, password: this.password } }
        });
        console.log(response);
        if (response.data.success) {
          this.$router.replace({ name: "dashboard" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
