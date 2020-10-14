<template>
  <div class="textlockup">
    <div class="img">
      <slot name="img">
        <img src="/web-bg.jpg" alt="#" />
      </slot>
    </div>
    <div class="text">
      <slot name="text">Centre for Agricultural Product Management</slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.textlockup {
  display: grid;
  grid-template-columns: 50px 100px 1fr;
  grid-template-rows: 50px 50px 100px 20px 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  .text {
    grid-area: 4 / 3 / 5 / 4;
    font-size: 3.5vmin;
    color: #efefef;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .img {
    max-width: 100%;
    grid-area: 1 / 1 / 6 / 4;
    img {
      width: 100%;
    }
  }
}

</style>