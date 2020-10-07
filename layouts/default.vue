<template>
  <div>
    <AppNav />
    <v-app v-show="!isLoading">
      <v-fade-transition mode="out-in">
        <nuxt />
      </v-fade-transition>
    </v-app>
  </div>
</template>

<script>
import AppNav from "~/components/AppNav";

  export default {
    components: {
    AppNav
    },
    data() {
      return {
        isLoading: true
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.isLoading = false
      });
    }
  }
</script>