<template>
  <app-header />
  <div class="flex pt-16 justify-center">
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
