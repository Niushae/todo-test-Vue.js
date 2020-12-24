<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>

<script lang="ts">
import Nav from "@/components/Nav.vue";
import "tailwindcss/tailwind.css";
import Vue from "vue";

export default Vue.extend({
  name: "App",
  components: {
    Nav
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
