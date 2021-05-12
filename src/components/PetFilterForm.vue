<template>
  <form class="px-6 pb-6">
    <div class="flex flex-col items-start">
      <autocomplete
        v-model="selectedAnimal"
        :defaultValue="'Rabbit'"
        label="Animal"
        :items="animalItems"
        :filter="filterAnimals"
        item-text="name"
        item-value="name"
      />
      <autocomplete
        v-model="selectedLocation"
        label="Location"
        :items="locationItems"
        :filter="filterLocations"
      />
    </div>
  </form>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import Autocomplete from './Autocomplete.vue'

export default defineComponent({
  components: {
    Autocomplete,
  },
  setup() {
    const selectedAnimal = ref('')

    // eslint-disable-next-line no-unused-vars
    function filterAnimals(item, queryText, itemText) {
      const text = item.name.toLowerCase()
      const searchText = queryText.toLowerCase()

      return text.indexOf(searchText) > -1
    }

    const animalItems = reactive([
      {
        name: 'Rabbit',
      },
      {
        name: 'Dog',
      },
      {
        name: 'Cat',
      },
      {
        name: 'Bird',
      },
      {
        name: 'Lizard',
      },
      {
        name: 'Fish',
      },
    ])

    const selectedLocation = ref('')

    // eslint-disable-next-line no-unused-vars
    function filterLocations(item, queryText, itemText) {
      const text = item.toLowerCase()
      const searchText = queryText.toLowerCase()

      return text.indexOf(searchText) > -1
    }

    const locationItems = reactive([
      'Raleigh',
      'New York City',
      'Atlanta',
      'Los Angeles',
      'Denver',
      'Seattle',
    ])

    return {
      selectedAnimal,
      animalItems,
      filterAnimals,
      selectedLocation,
      locationItems,
      filterLocations,
    }
  },
})
</script>
