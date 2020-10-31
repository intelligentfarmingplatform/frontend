<template>
  <div class="flex justify-center">
    <div class="max-w-screen-lg flex flex-col min-h-screen w-full">
      <AppNav />
      <Nuxt />
      <AppSpeedDial />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppNav from '~/components/AppNav'
import AppSpeedDial from '~/components/AppSpeedDial'
import AppFooter from '~/components/AppFooter'

export default {
  components: {
    AppNav,
    AppSpeedDial,
    AppFooter,
  },
}
</script>

<style>
html {
  font-family: 'prompt';
}
</style>
