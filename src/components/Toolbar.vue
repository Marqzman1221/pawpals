<template>
  <div
    class="bg-white p-4 flex flex-row justify-between items-center w-full h-16"
  >
    <div>
      <slot name="toolbar-icon"> </slot>

      <slot name="toolbar-title"> </slot>
    </div>

    <div>
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
