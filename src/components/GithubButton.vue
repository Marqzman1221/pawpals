<template>
  <Button icon>
    <icon size="lg" :path="mdiGithub" @click="openRepoPage()" />
  </Button>
</template>

<script>
import { defineComponent } from 'vue'
import Button from './Button'
import Icon from './Icon'
import { mdiGithub } from '@mdi/js'

export default defineComponent({
  components: { Button, Icon },
  setup() {
    function openRepoPage() {
      console.log('Open Repo Page')
      window.open('https://github.com/Marqzman1221/pawpals', '_blank')
    }

    return {
      openRepoPage,
      mdiGithub,
    }
  },
})
</script>
