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
          @click="selectItem(pet.id)"
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
    // Get Vue Router instance
    const router = useRouter()

    // Collect state and functions from usePets composition
    const { recentlyViewed } = usePets()

    // Navigate to pet detail page with given id
    function selectItem(id) {
      router.push({
        name: 'Pet',
        params: {
          id: id,
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
