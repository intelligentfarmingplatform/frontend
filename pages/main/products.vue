<template>
  <div>
    <AppProduct :data="storedata" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppProduct from "~/components/AppProduct.vue";

export default {
  components: {
    AppProduct
  },
  computed: {
    ...mapState(["storedata"])
  }
};
</script>
