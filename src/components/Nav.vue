<template>
  <div class=" w-full h-14 bg-purple-400 flex items-center px-4">
    <div class="mx-auto">
      <div class="relative text-gray-400">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button
            type="submit"
            class="p-1 focus:outline-none focus:shadow-outline"
          >
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </span>
        <input
          type="search"
          class="py-2 text-sm text-gray-900 bg-white rounded-md pl-10 focus:outline-none"
          placeholder="Buscar..."
          autocomplete="off"
        />
      </div>
    </div>
    <div class="flex justify-end absolute right-0 mr-4">
      <router-link class="mr-4" to="/home">Inicio</router-link>
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
