<template>
      <div class="flex justify-center">
        <div class="max-w-screen-lg flex flex-col min-h-screen w-full">
    <AppNav />
    <Nuxt />
    <AppFooter />
          </div>

    </div>
</template>

<script>
import AppNav from "~/components/AppNav";
import AppFooter from "~/components/AppFooter";

  export default {
    components: {
    AppNav,
    AppFooter
    }
  }
</script>

<style>
html {
  font-family:'prompt'
}
  </style>
