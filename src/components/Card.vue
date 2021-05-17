<template>
  <div class="flex bg-white m-2 rounded border-2 border-gray-200">
    <div class="sm:m-6 m-4 flex-grow">
      <div class="flex text-2xl">
        <slot name="card-title"></slot>
      </div>

      <slot></slot>

      <slot class="mt-6" name="card-actions"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  // TODO
})
</script>
