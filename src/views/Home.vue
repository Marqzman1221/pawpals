<template>
  <div
    class="
      flex
      xl:max-w-screen-xl
      lg:max-w-screen-lg
      sm:max-w-screen-sm
      flex-grow
      lg:my-2
    "
  >
    <div v-show="lgAndGreater" class="justify-end">
      <pet-search-card class="flex w-72" />
    </div>
    <div class="flex-grow justify-center">
      <div class="overflow-y-auto">
        <pets-list />
      </div>
    </div>
    <div v-show="xlAndGreater" class="justify-start">
      <recently-viewed-card v-if="recentlyViewed" class="flex w-72" />
      <div v-else class="flex m-2 w-72" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import PetSearchCard from '../components/PetSearchCard.vue'
import PetsList from '@/components/PetsList'
import RecentlyViewedCard from '@/components/RecentlyViewedCard'
import { usePets } from '@/compositions/pets'

export default defineComponent({
  components: { PetSearchCard, PetsList, RecentlyViewedCard },
  setup() {
    // Collect state and functions from usePets composition
    const { recentlyViewed } = usePets()

    // Initialize reactive breakpoints
    const breakpoints = useBreakpoints(breakpointsTailwind)

    const lgAndGreater = breakpoints.greater('lg')
    const xlAndGreater = breakpoints.greater('xl')

    return {
      breakpoints,
      recentlyViewed,
      lgAndGreater,
      xlAndGreater,
    }
  },
})
</script>
