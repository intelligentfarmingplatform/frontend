<template>
  <div
  >
  <p>
    dsfsdfsdfsd
  </p>
    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content >
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.link"
          :key="child.title"
          link
          :to="child.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
// Utilities
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      logo: '/engine.png',
 items: [
        {
          title: 'บัญชีของฉัน',
          icon: 'fas fa-cogs',
          to:'/user/account/user-profile',
          link: [
              {
                icon: 'mdi-view-dashboard',
                title: 'ข้อมูลส่วนตัว',
                to: '/user/account/user-profile',
              },
              {
                icon: 'fas fa-sliders-h',
                title: 'บัญชีธนาคาร&บัตร',
                to: '/user/account/bank-card',
              },
              {
                icon: 'fas fa-sliders-h',
                title: 'ที่อยู่',
                to: '/user/account/user-address',
              },
              {
                icon: 'fas fa-sliders-h',
                title: 'เปลี่ยนรห้สผ่าน',
                to: '/user/account/passwordSet',
              },
            ],
        },
        {
          title: 'การซื้อของฉัน',
          icon: 'fas fa-shopping-cart',
          to: '/user/purchase/myOrder'
        },
      ],
      responsive: true,
    }
  },
  computed: {
    ...mapGetters({
      textcolor: 'app/gettextColor',
      color: 'app/getColor',
      drawer: 'app/getDrawer',
    }),

    inputValue: {
      get() {
        return this.drawer
      },
      set(val) {
        this.setDrawer(val)
      },
    },
  },
  mounted() {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapActions({
      setDrawer: 'app/setDrawer',
    }),

    onResponsiveInverted() {
      this.responsive = window.innerWidth < 991
    },
  },
}
</script>

<style lang="scss" scoped>
.theme--light.v-sheet{
  background: none;
}
</style>
