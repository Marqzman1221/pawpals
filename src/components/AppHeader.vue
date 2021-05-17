<template>
  <header class="fixed top-0 left-0 w-screen shadow z-40">
    <toolbar class="text-pink-600">
      <template #toolbar-icon>
        <Icon size="lg" :path="mdiPaw" />
      </template>

      <template #toolbar-title>PAWPALS</template>

      <template #toolbar-actions>
        <github-button />
      </template>
    </toolbar>
  </header>
</template>

<script>
import { defineComponent } from 'vue'
import GithubButton from './GithubButton.vue'
import Icon from './Icon.vue'
import Toolbar from './Toolbar.vue'
import { mdiPaw } from '@mdi/js'

export default defineComponent({
  components: { Toolbar, GithubButton, Icon },
  setup() {
    return {
      mdiPaw,
    }
  },
})
</script>
