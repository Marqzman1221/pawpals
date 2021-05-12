<template>
  <div class="fixed top-0 left-0 w-screen">
    <toolbar>
      <template #toolbar-title>
        <div class="text-pink-600 text-2xl text-bold">PAWPALS</div>
      </template>

      <template #toolbar-actions>
        <Button>GitHub</Button>
      </template>
    </toolbar>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Button from './Button.vue'
import Toolbar from './Toolbar.vue'

export default defineComponent({
  components: { Toolbar, Button },
})
</script>
