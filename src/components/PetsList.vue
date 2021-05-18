<template>
  <div v-if="loadingList">
    <div
      v-show="!lgAndGreater"
      class="flex rounded bg-gray-200 flex-grow h-12 m-2"
    />
    <div v-for="item in 20" :key="item">
      <pet-card :loading="true" />
    </div>
  </div>

  <div v-else>
    <pet-search-modal />

    <div v-if="petsList.length === 0">
      <div class="flex h-32 mb-2 items-center justify-center">
        <div class="flex flex-col items-center justify-center">
          <div class="text-lg font-semibold">Sorry, We Couldn't Find Any</div>
          <icon class="text-pink-600" :path="mdiEmoticonSadOutline" size="lg" />
        </div>
      </div>
    </div>

    <div v-else>
      <div v-for="pet in petsList" :key="pet.id">
        <pet-card :animal="pet" />
      </div>

      <div class="flex sm:h-48 h-32 mb-2 items-center justify-center">
        <icon
          v-show="appendingList"
          class="animate-spin text-pink-600"
          :path="mdiLoading"
          size="xl"
        />

        <div
          v-show="queriedParams.page === maxPage"
          class="flex flex-col items-center justify-center"
        >
          <div class="text-lg font-semibold">That's All Folks</div>
          <icon
            class="text-pink-600"
            :path="mdiEmoticonHappyOutline"
            size="lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { usePets } from '../compositions/pets'
import PetCard from './PetCard'
import PetSearchModal from './PetSearchModal'
import {
  mdiLoading,
  mdiEmoticonHappyOutline,
  mdiEmoticonSadOutline,
} from '@mdi/js'
import Icon from './Icon.vue'

export default defineComponent({
  components: { PetCard, PetSearchModal, Icon },
  setup() {
    const {
      maxPage,
      queriedParams,
      loadingList,
      petsList,
      fetchPets,
      fetchPetsAppend,
    } = usePets()

    const breakpoints = useBreakpoints(breakpointsTailwind)

    const lgAndGreater = breakpoints.greater('lg')

    onMounted(async () => {
      if (petsList.value) return

      await fetchPets()
    })

    const bottom = ref(false)

    function bottomVisible() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    }

    window.addEventListener('scroll', () => {
      bottom.value = bottomVisible()
    })

    const appendingList = ref(false)

    watch(bottom, async () => {
      if (!appendingList.value && bottom.value) {
        appendingList.value = true
        await fetchPetsAppend()
        bottom.value = false
        appendingList.value = false
      }
    })

    return {
      maxPage,
      queriedParams,
      petsList,
      appendingList,
      loadingList,
      lgAndGreater,
      mdiLoading,
      mdiEmoticonHappyOutline,
      mdiEmoticonSadOutline,
    }
  },
})
</script>
