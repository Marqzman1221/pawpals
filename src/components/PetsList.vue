<template>
  <div v-if="loadingList">
    <div
      v-show="!lgAndGreater"
      class="flex rounded bg-gray-200 flex-grow h-12 m-2"
    />
    <div v-for="item in 20" :key="item" ref="scroll">
      <pet-card :loading="true" />
    </div>
  </div>

  <div v-else>
    <search-modal />
    <div v-for="pet in petsList" :key="pet.id" ref="scroll">
      <pet-card :animal="pet" />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { usePets } from '../compositions/pets'
import PetCard from './PetCard'
import SearchModal from './SearchModal'
import { mdiMagnify } from '@mdi/js'

export default defineComponent({
  components: { PetCard, SearchModal },
  setup() {
    const { queriedParams, loadingList, petsList, fetchPets } = usePets()
    const breakpoints = useBreakpoints(breakpointsTailwind)

    const lgAndGreater = breakpoints.greater('lg')

    onMounted(async () => {
      if (petsList.value) return

      await fetchPets()
    })

    return {
      queriedParams,
      petsList,
      loadingList,
      lgAndGreater,
      mdiMagnify,
    }
  },
})
</script>
