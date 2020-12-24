<template>
  <div class=" w-full h-14 bg-purple-400 flex items-center px-4">
    <div class="flex justify-end absolute right-0 mr-4">
      <router-link class="mr-4" to="/">Inicio</router-link>
      <router-link to="/favoritos">Favoritos</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Nav",
  components: {}
});
</script>

<style></style>
