<template>
  <app-header />
  <div class="absolute top-16 w-full overflow-y-auto">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import AppHeader from './components/AppHeader'

export default defineComponent({
  components: {
    AppHeader,
  },
})
</script>

<style src="./assets/css/tailwind.css" />
