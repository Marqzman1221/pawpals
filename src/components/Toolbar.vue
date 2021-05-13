<template>
  <div class="bg-white p-4 flex flex-row items-center w-full h-16">
    <div>
      <slot name="toolbar-icon"> </slot>
    </div>

    <span class="inline-block text-2xl text-bold mx-4 align-middle">
      <slot name="toolbar-title"> </slot>
    </span>

    <div class="flex flex-grow justify-end">
      <slot name="toolbar-actions"> </slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  color: {
    type: String,
    default: '#ffffff',
  },
})
</script>

<style></style>
