<template>
  <Button icon>
    <icon size="lg" :path="mdiGithub" @click="openRepoPage()" />
  </Button>
</template>

<script>
import { defineComponent } from 'vue'
import Button from './ui/Button'
import Icon from './ui/Icon'
import { mdiGithub } from '@mdi/js'

export default defineComponent({
  components: { Button, Icon },
  setup() {
    // Open project's Github repository url in new tab
    function openRepoPage() {
      window.open('https://github.com/Marqzman1221/pawpals', '_blank')
    }

    return {
      openRepoPage,
      mdiGithub,
    }
  },
})
</script>
