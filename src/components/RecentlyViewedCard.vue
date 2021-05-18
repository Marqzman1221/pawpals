<template>
  <card>
    <template #card-title>
      <span class="inline-flex items-center w-full">
        <span class="flex-grow">Recently Viewed</span>
      </span>
    </template>

    <div class="flex w-full mt-4">
      <ul class="w-full divide-y divide-gray-200">
        <li
          v-for="pet in recentlyViewed"
          class="
            transition
            duration-200
            ease-in-out
            hover:bg-gray-200
            active:bg-gray-400
            cursor-pointer
          "
          :key="pet.id"
          @click="selectItem(pet)"
        >
          <div class="flex p-2">
            <div class="text-lg font-semibold">{{ pet.name }}</div>
          </div>
        </li>
      </ul>
    </div>
  </card>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { usePets } from '../compositions/pets'
import Card from './ui/Card.vue'

export default defineComponent({
  components: { Card },
  setup() {
    const router = useRouter()
    const { recentlyViewed } = usePets()

    function selectItem(pet) {
      router.push({
        name: 'Pet',
        params: {
          id: pet.id,
        },
      })
    }

    return {
      recentlyViewed,
      selectItem,
    }
  },
})
</script>
