<template>
  <v-card class="footer" height="150">
    <v-footer
      absolute
      class="font-weight-medium"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Intelligent Farming Platform</strong>
      </v-col>
    </v-footer>
  </v-card>
</template>

<style scoped>
    .footer{
        position: absolute;
    }
</style>