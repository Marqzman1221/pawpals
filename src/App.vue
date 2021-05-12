<template>
  <div class="flex flex-col">
    <!-- <app-header /> -->
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
// import AppHeader from './components/AppHeader'

export default defineComponent({
  components: {
    // AppHeader,
  },
})
</script>

<style src="./assets/css/tailwind.css" />
