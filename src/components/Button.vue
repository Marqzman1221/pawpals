<template>
  <button
    class="
      bg-pink-600
      hover:bg-pink-800
      active:bg-pink-400
      text-white
      font-bold
      py-2
      px-6
      rounded-full
    "
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    onClick: {
      type: Function,
      default: () => console.log('Click!'),
    },
  },
})
</script>

<style></style>
