<script setup>
import Cart from "./components/cart.vue";
import Footer from "./components/footer.vue";
</script>

<template>
  <router-link to="/">
    <img src="/logo.png" id="logo" alt="logo" />
  </router-link>
  <Cart />
  <router-view />
  <Footer />
</template>

<style>
body {
  background-color: #141414;
  background-image: url(/fundo.png);
  margin: 0;
}
</style>
