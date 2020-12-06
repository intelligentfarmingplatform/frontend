<template>
  <v-app>
    <core-toolbar />

    <core-drawer />

    <core-view />
  </v-app>
</template>

<script>
import coreToolbar from "~/components/core/AppToolbar";
import coreDrawer from "~/components/core/AppDrawer";
import coreView from "~/components/core/AppView";
export default {
  name: 'dashboard',
    middleware: 'auth',
  components: {
    coreToolbar,
    coreDrawer,
    coreView
  }
};
</script>

