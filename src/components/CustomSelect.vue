<template>
  <div class="flex flex-col w-48 relative">
    <div
      tabindex="10"
      @click="toggleOpen(!opened)"
      @blur="toggleOpen(false)"
      class="flex flex-row justify-between bg-gray-100 py-2 px-3 z-10"
      :class="opened ? 'rounded-t-lg' : 'rounded-lg'"
    >
      <p>{{ value ? value : placeholder }}</p>
      <svg
        class="w-6 h-6 transform transition-transform duration-100"
        :class="opened && '-rotate-180'"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
    <transition name="cselect">
      <div
        class="absolute w-full mt-10 bg-gray-100 rounded-b-lg z-0"
        v-show="opened"
      >
        <slot :select="selectObject" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";

export default Vue.extend({
  name: "CustomSelect",
  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    opened: false
  }),
  methods: {
    toggleOpen(value: boolean) {
      setTimeout(() => {
        this.opened = value;
      }, 150);
    },
    selectObject(data: any) {
      this.$emit("input", data);
      this.opened = false;
    }
  }
});
</script>

<style scoped>
.cselect-enter-active,
.cselect-leave-active {
  transition-property: all;
  transition-duration: 100ms;
  transform-origin: top;
}
.cselect-enter {
  opacity: 0;
  transform: translateY(-2rem);
}
.cselect-leave-active {
  opacity: 0;
  transform: translateY(-2rem);
}
</style>
