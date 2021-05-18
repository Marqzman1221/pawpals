<template>
  <card v-if="loading">
    <div class="flex w-full animate-pulse">
      <div class="flex w-auto">
        <div class="rounded-lg bg-gray-200 sm:w-48 sm:h-48 w-32 h-32" />
      </div>

      <div class="flex flex-col w-full ml-4">
        <div class="flex flex-col">
          <div class="rounded h-9 w-48 bg-gray-200" />
          <div class="mt-2 flex flex-row h-7">
            <div class="rounded w-16 h-full bg-gray-200" />
            <div class="rounded w-16 h-full ml-4 bg-gray-200" />
          </div>
        </div>
        <div
          v-show="smAndGreater"
          class="flex rounded bg-gray-200 mt-2 w-full h-full"
        />
      </div>
    </div>
  </card>

  <card
    v-else
    class="
      cursor-pointer
      hover:border-pink-400
      active:border-pink-600
      transition
      duration-200
      ease-in-out
    "
    @click="openDetail(animal.id)"
  >
    <div class="flex">
      <div class="flex w-auto">
        <div class="sm:w-48 sm:h-48 w-32 h-32">
          <img
            v-if="animal.primary_photo_cropped"
            class="rounded-lg w-full h-full object-cover"
            :alt="animal.name"
            :src="'' + animal.primary_photo_cropped.small"
          />
          <div
            v-else
            class="
              flex
              bg-gray-200
              rounded-lg
              w-full
              h-full
              items-center
              justify-center
            "
          >
            <icon class="text-white" :path="mdiCamera" size="xl" />
          </div>
        </div>
      </div>

      <div class="flex flex-col ml-4">
        <div class="flex flex-col">
          <div class="flex text-2xl font-semibold">
            {{ animal.name }}
          </div>
          <div class="flex mt-2 text-lg text-gray-500 font-light">
            {{ animal.type }} · {{ displayLocation }}
          </div>
        </div>
        <div v-show="smAndGreater" class="flex mt-2 w-full">
          <div class="text-left">
            {{ animal.description }}
          </div>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { mdiCamera } from '@mdi/js'
import Card from './ui/Card'
import Icon from './ui/Icon.vue'
import { usePets } from '../compositions/pets'

export default defineComponent({
  props: {
    animal: {
      type: Object,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: { Card, Icon },
  setup(props) {
    const router = useRouter()
    const { queriedParams } = usePets()
    const breakpoints = useBreakpoints(breakpointsTailwind)

    const smAndGreater = breakpoints.greater('sm')

    function openDetail(id) {
      router.push({
        name: 'Pet',
        params: {
          id: id,
        },
      })
    }

    const displayLocation = computed(() => {
      if (queriedParams && queriedParams.location)
        return `${props.animal.distance} mi`

      return `${props.animal.contact.address.city}, ${props.animal.contact.address.state}`
    })

    return {
      smAndGreater,
      openDetail,
      mdiCamera,
      displayLocation,
      queriedParams,
    }
  },
})
</script>

<style></style>
