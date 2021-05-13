<template>
  <form>
    <div class="flex flex-col items-start">
      <autocomplete
        v-model="filters.type"
        defaultValue="Rabbit"
        label="Animal"
        :items="typesList"
        :filter="filterAnimals"
      />
      <autocomplete
        v-model="filters.location"
        label="Location"
        :items="locationsList"
        :filter="filterLocations"
      />
    </div>
  </form>
</template>

<script>
import { defineComponent } from 'vue'
import Autocomplete from './Autocomplete.vue'
import { usePets } from '../compositions/pets'

export default defineComponent({
  components: {
    Autocomplete,
  },
  setup() {
    const { filters, typesList, locationsList } = usePets()

    // watch(getPetFilters, (currentValue, oldValue) => {
    //   console.log('OLD: ', oldValue)
    //   console.log('NEW: ', currentValue)
    // })

    // eslint-disable-next-line no-unused-vars
    function filterAnimals(item, queryText, itemText) {
      const text = item.toLowerCase()
      const searchText = queryText.toLowerCase()

      return text.indexOf(searchText) > -1
    }

    // eslint-disable-next-line no-unused-vars
    function filterLocations(item, queryText, itemText) {
      const text = item.toLowerCase()
      const searchText = queryText.toLowerCase()

      return text.indexOf(searchText) > -1
    }

    return {
      filters,
      typesList,
      filterAnimals,
      locationsList,
      filterLocations,
    }
  },
})
</script>
