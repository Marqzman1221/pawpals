<template>
  <div class="bg-white m-2 rounded border-2 border-gray-200">
    <div class="m-6">
      <div class="flex text-2xl">
        <slot name="card-title"></slot>
      </div>

      <slot></slot>

      <div class="mt-6">
        <slot name="card-actions"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  // TODO
})
</script>
