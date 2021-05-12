<template>
  <card>
    <toolbar>
      <template #toolbar-title>
        <div class="text-gray-800 text-black text-2xl">Filter</div>
      </template>
    </toolbar>

    <pet-filter-form />
  </card>
</template>

<script>
import { defineComponent } from 'vue'
import Card from './Card.vue'
import Toolbar from './Toolbar.vue'
import PetFilterForm from './PetFilterForm.vue'

export default defineComponent({
  components: { Card, Toolbar, PetFilterForm },
})
</script>
