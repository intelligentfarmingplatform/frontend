<template>
  <div class="flex justify-center">
    <div class="max-w-screen-lg flex flex-col min-h-screen w-full">
      <AppNav />
      <Nuxt />
      <MiniCartFab />
      <AppSpeedDial />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppNav from '~/components/AppNav'
import AppSpeedDial from '~/components/AppSpeedDial'
import MiniCartFab from '~/components/MiniCartFab'
import AppFooter from '~/components/AppFooter'

export default {
  name:'default',
  components: {
    AppNav,
    AppSpeedDial,
    AppFooter,
    MiniCartFab,
  },
}
</script>

<style>
html {
  font-family: 'prompt';
}
</style>
