<template>
  <div class="main-app">
    <div class="flex justify-center">
      <div class="back">
        <AppNav />
        <Nuxt />
        <!-- <MiniCartFab /> -->
        <AppSpeedDial />
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<script>
import AppNav from '~/components/AppNav'
import AppSpeedDial from '~/components/AppSpeedDial'
import MiniCartFab from '~/components/MiniCartFab'
import AppFooter from '~/components/AppFooter'

export default {
  name: 'default',
  components: {
    AppNav,
    AppSpeedDial,
    AppFooter,
    MiniCartFab,
  },
}
</script>

<style>
.main-app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
html,body {
  height: 100%;
  font-family: 'prompt';
}
.back {
  background-color:#f4f7f8;
}
</style>
