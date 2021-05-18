<template>
  <card>
    <template #card-title>
      <span class="inline-flex items-center w-full">
        <span class="flex-grow">Find A Pet</span>
      </span>
    </template>

    <form>
      <div class="flex flex-col items-start">
        <autocomplete
          v-model="params.type"
          defaultValue="Rabbit"
          label="Type"
          :items="typesList"
          :filter="filterTypes"
        />
        <autocomplete
          v-model="params.location"
          defaultValue="Raleigh, NC"
          label="Location"
          :items="locationsList"
          :loading="loadingLocations"
          :search-function="searchLocations"
        />
      </div>
    </form>

    <template #card-actions>
      <Button class="mt-6" block @click="submitSearch()">SEARCH</Button>
      <slot name="cancel-button"></slot>
    </template>
  </card>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import Autocomplete from './ui/Autocomplete.vue'
import Card from './ui/Card.vue'
import Button from './ui/Button.vue'
import { usePets } from '@/compositions/pets'

export default defineComponent({
  components: { Autocomplete, Card, Button },
  setup() {
    const loadingLocations = ref(false)
    const {
      params,
      fetchPets,
      typesList,
      fetchTypes,
      locationsList,
      fetchLocations,
    } = usePets()

    onMounted(() => {
      fetchTypes()
    })

    async function searchLocations(value) {
      if (loadingLocations.value) return

      loadingLocations.value = true
      await fetchLocations(value)
      loadingLocations.value = false
    }

    // eslint-disable-next-line no-unused-vars
    function filterTypes(item, queryText, itemText) {
      const text = item.toLowerCase()
      const searchText = queryText.toLowerCase()

      return text.indexOf(searchText) > -1
    }

    async function submitSearch() {
      await fetchPets()
    }

    return {
      params,
      loadingLocations,
      typesList,
      locationsList,
      filterTypes,
      searchLocations,
      submitSearch,
    }
  },
})
</script>
