<template>
  <div
    v-show="!lgAndGreater"
    class="
      flex flex-grow
      m-2
      cursor-pointer
      outline-none
      hover:border-pink-400
      active:border-pink-600
      transition
      duration-200
      ease-in-out
      rounded
      bg-gray-200
      h-12
      items-center
      content-center
    "
    @click="openModal()"
  >
    <div class="flex px-4">
      <span class="mr-4">
        <icon :path="mdiMagnify" />
      </span>
      <span class="italic font-semibold">{{ queriedParams.type }}</span
      ><span class="px-1">near</span>
      <span class="italic font-semibold">{{ queriedParams.location }}</span>
    </div>
  </div>

  <div v-if="modal" class="static z-50 transition-opacity duration-300" >
    <pet-search-card class="absolute m-0 top-0 left-0 w-full h-full z-50 border-transparent rounded-none">
      <template #cancel-button>
        <Button class="mt-6" outlined block @click="closeModal()">CANCEL</Button>
      </template>
    </pet-search-card>
  </div>
</template>

<script>
import { defineComponent, onUnmounted, ref } from 'vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { usePets } from '@/compositions/pets'
import Button from './Button'
import PetSearchCard from './PetSearchCard'
import Icon from './Icon'
import { mdiMagnify } from '@mdi/js'

export default defineComponent({
  components: { PetSearchCard, Icon, Button },
  setup() {
    const modal = ref(false)
    const { params, queriedParams } = usePets()
    const breakpoints = useBreakpoints(breakpointsTailwind)

    const lgAndGreater = breakpoints.greater('lg')

    function openModal() {
      console.log('Open Modal')
      modal.value = true

      document.documentElement.style.overflow = 'hidden'
    }

    function closeModal() {
      modal.value = false
      params.type = queriedParams.type
      params.location = queriedParams.location

      document.documentElement.style.overflow = 'auto'
    }

    onUnmounted(() => {
      document.documentElement.style.overflow = 'auto'
    })

    return {
      modal,
      lgAndGreater,
      queriedParams,
      openModal,
      closeModal,
      mdiMagnify,
    }
  }
})
</script>
