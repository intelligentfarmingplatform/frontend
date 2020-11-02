<template>
  <v-card id="create">
    <v-speed-dial
      class="fixed"
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>
        <vs-tooltip left>
          <v-btn v-model="fab" color="blue darken-2" dark fab>
            <v-icon v-if="fab"> mdi-close </v-icon>
            <img src="/contact-us.png" v-else />
          </v-btn>
          <template #tooltip> ติดต่อเรา </template>
        </vs-tooltip>
      </template>
      <vs-tooltip left>
        <v-btn
          fab
          dark
          small
          color="green"
          href="https://www.facebook.com/"
          target="_blank"
        >
          <img src="/facebook.png" />
        </v-btn>
        <template #tooltip> Facebook </template>
      </vs-tooltip>
      <vs-tooltip left>
        <v-btn
          fab
          dark
          small
          color="indigo"
          href="https://line.me/th/"
          target="_blank"
        >
          <img src="/line.png" />
        </v-btn>
        <template #tooltip> Line </template>
      </vs-tooltip>
    </v-speed-dial>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    direction: 'top',
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: 'slide-y-reverse-transition',
  }),

  computed: {
    activeFab() {
      switch (this.tabs) {
        case 'one':
          return { class: 'purple', icon: 'account_circle' }
        case 'two':
          return { class: 'red', icon: 'edit' }
        case 'three':
          return { class: 'green', icon: 'keyboard_arrow_up' }
        default:
          return {}
      }
    },
  },

  watch: {
    top(val) {
      this.bottom = !val
    },
    right(val) {
      this.left = !val
    },
    bottom(val) {
      this.top = !val
    },
    left(val) {
      this.right = !val
    },
  },
}
</script>

<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  position: absolute;
}

#create .fixed {
  position: fixed;
  right: 15px;
  bottom: 15px;
}
</style>
