<template>
  <div class="home">
    <p class="text-center text-4xl py-10">Todo List</p>
    <div
      class="relative text-gray-400 flex flex-col justify-center w-96 mx-auto mb-5"
    >
      <input
        type="search"
        class="py-2 text-sm text-gray-900 bg-gray-100 rounded-md pr-10 pl-2 focus:outline-none"
        placeholder="Agregar todo..."
        autocomplete="off"
        v-model="newTodo"
        @keyup.enter="addTodo()"
      />
      <span class="absolute inset-y-0 right-0 flex items-center pr-2">
        <button
          type="submit"
          class="p-1 focus:outline-none focus:shadow-outline"
          @click="addTodo()"
        >
          <BaseIcon name="add" />
        </button>
      </span>
    </div>

    <div class="flex justify-center mb-5" v-if="getTodos.length">
      <p class="my-auto pr-2">Ordernar por</p>
      <CustomSelect
        class="z-10"
        v-model="selectedOption"
        v-slot="context"
        placeholder="seleccione"
      >
        <div
          class="text-left px-3 py-2"
          v-for="option in options"
          :key="option"
          :value="option"
          @click="context.select(option)"
        >
          {{ option }}
        </div>
      </CustomSelect>
    </div>
    <div v-if="getTodos.length">
      <button
        class="mb-5 mx-1 transition-all duration-100 p-2 rounded text-purple-500 border border-purple-400 hover:bg-purple-400 hover:text-white"
        @click="selectAllTodos()"
      >
        <span v-if="allTodosSelected">Deseleccionar todos</span>
        <span v-else>Seleccionar todos</span>
      </button>
      <button
        class="mb-5 mx-1 transition-all duration-100 p-2 rounded text-red-500 border border-red-400 hover:bg-red-400 hover:text-white"
        v-if="selectedTareas.length"
        @click="deleteSelectedTodos()"
      >
        Eliminar seleccion
      </button>
      <button
        class="mb-5 mx-1 transition-all duration-100 p-2 rounded text-yellow-500 border border-yellow-400 hover:bg-yellow-400 hover:text-white"
        @click="deleteCompletedTodos()"
      >
        Eliminar completados
      </button>
    </div>
    <div v-if="getTodos.length">
      <Todo
        v-for="todo in getTodos"
        :key="todo.id"
        :todo="todo"
        :isActive="allTodosSelected || selectedTareas.includes(todo.id)"
        class="first:rounded-t-xl last:rounded-b-xl"
        @onSelect="selectTodo(todo.id)"
      />
    </div>
    <div v-else>
      <p class="text-center">
        Por los momentos no existen todos
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Todo from "@/components/Todo.vue";
import CustomSelect from "@/components/CustomSelect.vue";
import BaseIcon from "@/components/BaseIcon.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Todo,
    CustomSelect,
    BaseIcon
  },
  data() {
    return {
      newTodo: "",
      options: ["Fecha", "Favoritos"],
      selectedTareas: [] as string[],
      selectedOption: "",
      allTodosSelected: false
    };
  },
  computed: {
    getTodos: function(): any {
      if (this.selectedOption.includes("Fecha")) {
        return this.$store.getters.getSortedByDate;
      }
      if (this.selectedOption.includes("Favoritos")) {
        return this.$store.getters.getSortedByFaves;
      }
      return this.$store.getters.getTodos;
    }
  },
  watch: {
    selectedTareas: function() {
        if(this.selectedTareas.length == this.getTodos.length) {
          this.allTodosSelected = true
        }

    }
  },  
  methods: {
    addTodo: function() {
      this.$store.commit("add", this.newTodo);
      this.newTodo = "";
    },
    deleteSelectedTodos: function() {
      if (this.allTodosSelected) {
        this.$store.commit("deleteAll");
        this.allTodosSelected = false;
      } else {
        this.$store.commit("deleteSelected", this.selectedTareas);
      }
      this.selectedTareas = [];
    },
    deleteCompletedTodos: function() {
      this.$store.commit("deleteCompleted");
    },
    selectTodo: function(id: string) {
      if (this.allTodosSelected) this.allTodosSelected = false;
      if (
        this.selectedTareas.findIndex((selected: string) => selected == id) !==
        -1
      ) {
        const index = this.selectedTareas.findIndex(
          (selectedId: string) => selectedId == id
        );
        this.selectedTareas.splice(index, 1);
      } else {
        this.selectedTareas.push(id);
      }
    },
    selectAllTodos: function() {
      if (this.allTodosSelected) {
        this.selectedTareas = [];
        this.allTodosSelected = false;
      } else {
        this.selectedTareas = this.getTodos.map((todo: any) => todo.id);
        this.allTodosSelected = true;
      }
    }
  }
});
</script>
