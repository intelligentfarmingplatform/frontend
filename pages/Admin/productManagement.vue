<template>
  <v-container fill-height fluid>
    <v-layout justify-center align-center>
      <v-flex xs12>
        <material-card
          color="green"
          title="Product Management"
          text="Edit"
        >
          
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import materialCard from '~/components/material/AppCard'

export default {
  layout: 'dashboard',
  middleware: 'auth',
  components: {
    materialCard,
  },
  data() {
    
  },
}
</script>

<style lang="scss" scoped>

</style>
