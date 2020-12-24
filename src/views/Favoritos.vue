<template>
  <div class="mt-2">
    <p class="text-center text-4xl py-10">Favoritos</p>
    <div v-if="getFaves.length">
      <Todo
        v-for="todo in getFaves"
        :key="todo.id"
        :todo="todo"
        class="first:rounded-t-xl last:rounded-b-xl"
      />
    </div>
    <p v-else class="text-center">
      Por los momentos no se encuentran todos favoritos en la lista
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Todo from "@/components/Todo.vue";

export default Vue.extend({
  name: "Favoritos",
  components: {
    Todo
  },
  computed: {
    getFaves: function() {
      return this.$store.getters.getFaves;
    }
  }
});
</script>

<style></style>
