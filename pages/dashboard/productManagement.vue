<template>
  <v-container fill-height fluid>
    <v-layout justify-center align-center>
      <v-flex xs12>
        <material-card
          color="#00B3CA"
          title="Product Management"
          text="add/edit"
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
  components: {
    materialCard,
  },
  data() {
    return{
      
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
