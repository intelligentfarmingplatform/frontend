<template>
  <div>
    <div ref="card"></div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      error:"",
      stripe:null,
      card:null
    }
  },mounted(){
    const elements = this.$stripe.import().elements();
    const card = elements.create('card', {});
    // Add an instance of the card Element into the `card-element` <div>
    card.mount(this.$refs.card);
  },

}
</script>
<style>
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>
