<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      class="logo"
      height="100%"
    >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list>
          <v-list-tile avatar to="/admin/dashboard">
            <v-list-tile-title class="title">
                          <v-img class="logo-img"
                :src="logo"
                height="75"
               max-width="80%"
                contain
              />
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-divider/>
        <v-list dense>
          <v-list-tile
            v-if="responsive"
          >
            <v-text-field
              class="red-input search-input"
              label="Search..."
              color="red"
            />
          </v-list-tile>
          <v-list-tile
            v-for="(link, i) in links"
            :key="i"
            :to="link.to"
            :active-class="color"
            avatar
            class="v-list-item"
>
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile
              v-text="link.text"
            />
          </v-list-tile>
        </v-list>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data() {
      return {
        logo: '/engine.png',
        links: [
          {
            to: '/admin/dashboard',
            icon: 'mdi-view-dashboard',
            text: 'Dashboard'
          },
          {
            to: '/admin/user-profile',
            icon: 'mdi-account',
            text: 'User Profile'
          },
          {
            to: '/admin/table-list',
            icon: 'mdi-clipboard-outline',
            text: 'Table List'
          },
          {
            to: '/admin/typography',
            icon: 'mdi-format-font',
            text: 'Typography'
          },
          {
            to: '/admin/icons',
            icon: 'mdi-chart-bubble',
            text: 'Icons'
          },
          {
            to: '/admin/maps',
            icon: 'mdi-map-marker',
            text: 'Maps'
          },
          {
            to: '/admin/notifications',
            icon: 'mdi-bell',
            text: 'Notifications'
          }
        ],
        responsive: true
      }
    },
    computed: {
      ...mapGetters({
        textcolor: 'app/gettextColor',
        color: 'app/getColor',
        drawer: 'app/getDrawer'
      }),


      inputValue: {
        get() {
          return this.drawer
        },
        set(val) {
          this.setDrawer(val)
        }
      }
    },
    mounted () {
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.onResponsiveInverted)
    },
    methods: {
      ...mapActions({
        setDrawer: 'app/setDrawer'
      }),

      onResponsiveInverted() {
        this.responsive = window.innerWidth < 991;
      }
    }
  }
</script>

<style lang="scss">
  #app-drawer {

    &.v-navigation-drawer .v-list {
      background: rgb(0,179,202);
      padding: 0;
    }

    .v-divider {
      margin: 0;
    }

    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }

      &__title {
        color: #ffffff;
      }
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }
        .logo-img {
margin-left: 15px;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }

  }
</style>
