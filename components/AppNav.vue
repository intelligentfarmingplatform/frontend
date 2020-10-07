<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Intelligent Farming</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/main/products">Products</b-nav-item> 
        <b-nav-item to="/main/about">About</b-nav-item>
        <b-nav-item to="/main/contact">Contact us</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/main/cart">
        Cart <b-badge variant="light" v-if="cartCount > 0">{{ cartCount }}</b-badge>
        </b-nav-item>
        <b-nav-item to="/Auth/login">Login</b-nav-item>
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data: () => ({
      links: [
      { name: 'หน้าแรก', Link: '/main' },
      { name: 'สินค้า', Link: '/main/products' },
      { name: 'เกี่ยวกับเรา', Link: '/main/about' },
      { name: 'ติดต่อเรา', Link: '/main/contact' },
      { name: 'ตะกร้าสินค้า', Link: '/main/cart' }
    ]
    }),
    computed: {
    ...mapGetters(["cartCount"])
    },
  }
</script>