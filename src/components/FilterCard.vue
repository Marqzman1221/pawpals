<template>
  <card>
    <template #card-title>
      <span class="inline-flex items-center w-full">
        <span class="flex-grow">Filter</span>
        <Button class="justify-self-end" icon>
          <icon :path="mdiReload" />
        </Button>
      </span>
    </template>

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
import Icon from './Icon.vue'
import { mdiReload } from '@mdi/js'
import { usePets } from '../compositions/pets'

export default defineComponent({
  components: { Card, PetFilterForm, Button, Icon },
  setup() {
    const { petsList, fetchPets } = usePets()

    async function submitFilter() {
      console.log('Filter')
      await fetchPets()
      console.log(petsList.value)
    }

    return {
      petsList,
      mdiReload,
      submitFilter,
      fetchPets,
    }
  },
})
</script>
