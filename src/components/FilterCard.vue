<template>
  <card>
    <template #card-title>Filter</template>

    <pet-filter-form />

    <template #card-actions>
      <Button block @click="submitFilter">SEARCH</Button>
    </template>
  </card>
</template>

<script>
import { defineComponent } from 'vue'
import Card from './Card.vue'
import PetFilterForm from './PetFilterForm.vue'
import Button from './Button.vue'

export default defineComponent({
  components: { Card, PetFilterForm, Button },
  setup() {
    function submitFilter() {
      console.log('Filter')
    }

    return {
      submitFilter,
    }
  }
})
</script>
