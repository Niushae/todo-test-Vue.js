<template>
  <div
    class="todo group flex justify-between mx-auto w-full md:w-2/3 cursor-pointer relative hover:bg-indigo-200 py-2 px-4"
    :class="[
      isActive
        ? 'bg-indigo-200'
        : [todo.completada ? 'bg-gray-200' : 'bg-gray-100']
    ]"
    @click="$emit('onSelect')"
  >
    <div class="flex items-center">
      <label class="input-terms text-white mr-2">
        <div class="bg-white shadow w-6 h-6 p-1 items-center rounded-lg">
          <input
            type="checkbox"
            name="terms"
            class="hidden"
            v-model="todo.completada"
          />
          <BaseIcon name="check" />
        </div>
      </label>
      <div class="cursor-pointer mr-2" @click="changeFave(todo.id)" @click.stop>
        <svg
          class="w-6 h-6"
          :fill="changeColor"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          ></path>
        </svg>
      </div>
      <div v-if="editable" @click.stop>
        <input
          type="text"
          name=""
          id=""
          :value="todo.titulo"
          class="rounded-tl rounded-bl px-2"
          @change="newTitle = $event.target.value"
          @keyup.enter="editTodo(newTitle)"
        />
        <button
          @click="editTodo(newTitle)"
          class="check-edit align-middle text-green-400 bg-white rounded rounded-tr rounded-br"
        >
          <BaseIcon name="roundCheck" />
        </button>
      </div>
      <p v-else>{{ todo.titulo }}</p>
    </div>
    <div class="flex">
      <p class="group-hover:hidden flex">
        {{
          todo.fechaCreacion.toLocaleString("default", { month: "short" }) +
            " " +
            todo.fechaCreacion.getDate() +
            " " +
            todo.fechaCreacion.getFullYear()
        }}
      </p>
      <div class="group-hover:flex hidden" @click.stop>
        <div @click="editable = !editable">
          <BaseIcon name="edit" />
        </div>
        <div @click="deleteTodo(todo.id)">
          <BaseIcon name="trash" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BaseIcon from "./BaseIcon.vue";

export default Vue.extend({
  name: "Todo",
  components: {
    BaseIcon
  },
  props: {
    todo: Object,
    isActive: Boolean
  },
  data() {
    return {
      editable: false,
      newTitle: ""
    };
  },
  methods: {
    changeFave: function() {
      this.$store.commit("changeFave", this.todo.id);
    },
    deleteTodo: function() {
      this.$store.commit("delete", this.todo.id);
    },
    editTodo: function(editedTodo: string) {
      if (editedTodo !== "") {
        const id = this.todo.id;
        this.$store.commit("edit", { editedTodo, id });
      }
      this.editable = false;
    }
  },
  computed: {
    changeColor: function() {
      if (this.todo.favorita) {
        return "red";
      } else {
        return "none";
      }
    }
  }
});
</script>

<style>
.input-terms input:checked + svg {
  opacity: 1;
}
button.check-edit {
  margin-top: 2px;
  margin-left: -2px;
}
</style>
