import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    savedTodos: [
      {
        id: "1",
        titulo: "disenar la interfaz",
        completada: true,
        favorita: true,
        fechaCreacion: new Date(2019, 2, 18)
      },
      {
        id: "2",
        titulo: "disenar la base de datos",
        completada: false,
        favorita: true,
        fechaCreacion: new Date(2020, 11, 10)
      },
      {
        id: "3",
        titulo: "codificar la interfaz",
        completada: true,
        favorita: false,
        fechaCreacion: new Date(2020, 5, 2)
      },
      {
        id: "4",
        titulo: "codificar la base de datos",
        completada: false,
        favorita: false,
        fechaCreacion: new Date(2020, 10, 23)
      }
    ]
  },
  mutations: {
    add(state, newTodo) {
      if (newTodo !== "") {
        const newTodoObj = {
          id: Date.now().toString(),
          titulo: newTodo,
          completada: false,
          favorita: false,
          fechaCreacion: new Date()
        };
        state.savedTodos.push(newTodoObj);
      }
    },
    delete(state, id) {
      const index = state.savedTodos.findIndex(tarea => tarea.id == id);
      state.savedTodos.splice(index, 1);
    },
    deleteSelected(state, selectedTodos) {
      state.savedTodos = state.savedTodos.filter(
        tarea => !selectedTodos.includes(tarea.id)
      );
    },
    deleteAll(state) {
      state.savedTodos = [];
    },
    deleteCompleted(state) {
      state.savedTodos = state.savedTodos.filter(
        tarea => tarea.completada == false
      );
    },
    edit(state, { editedTodo, id }) {
      const index = state.savedTodos.findIndex(tarea => tarea.id == id);
      state.savedTodos[index].titulo = editedTodo;
    },
    changeFave(state, id) {
      const index = state.savedTodos.findIndex(tarea => tarea.id == id);
      state.savedTodos[index].favorita = !state.savedTodos[index].favorita;
    }
  },
  getters: {
    getTodos: state => {
      return state.savedTodos;
    },
    getSortedByDate: state => {
      return state.savedTodos.sort(
        (a: any, b: any) =>
          b.fechaCreacion.getTime() - a.fechaCreacion.getTime()
      );
    },
    getSortedByFaves: state => {
      return state.savedTodos.sort(function(a, b) {
        return a.favorita === b.favorita ? 0 : a.favorita ? -1 : 1;
      });
    },
    getFaves: state => {
      return state.savedTodos.filter(tarea => tarea.favorita == true);
    }
  },
  actions: {},
  modules: {}
});
