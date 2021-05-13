<template>
  <header class="fixed top-0 left-0 w-screen shadow z-1000">
    <toolbar>
      <template #toolbar-icon>
        <Icon size="lg" :path="mdiPaw" />
      </template>

      <template #toolbar-title>PAWPALS</template>

      <template #toolbar-actions>
        <Button icon>
          <icon size="lg" :path="mdiGithub" />
        </Button>
      </template>
    </toolbar>
  </header>
</template>

<script>
import { defineComponent } from 'vue'
import Button from './Button.vue'
import Icon from './Icon.vue'
import Toolbar from './Toolbar.vue'
import { mdiPaw, mdiGithub } from '@mdi/js'

export default defineComponent({
  components: { Toolbar, Button, Icon },
  setup() {
    return {
      mdiPaw,
      mdiGithub,
    }
  },
})
</script>
