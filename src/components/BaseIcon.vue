<template>
  <component :is="iconComponent" role="img" />
</template>

<script>
import Vue from "vue";

const icons = {
  trash: require("./icons/TrashIcon.vue").default,
  edit: require("./icons/EditIcon.vue").default,
  roundCheck: require("./icons/RoundCheckIcon.vue").default,
  check: require("./icons/CheckIcon.vue").default,
  add: require("./icons/AddIcon.vue").default
};

export default Vue.extend({
  name: "BaseIcon",
  props: {
    name: {
      type: String,
      required: true,
      validator(value) {
        return Object.prototype.hasOwnProperty.call(icons, value);
      }
    }
  },

  computed: {
    iconComponent: function() {
      return icons[this.name];
    }
  }
});
</script>
