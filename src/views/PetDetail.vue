<template>
  <div>
    {{ focusedPet }}
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePets } from '@/compositions/pets'

export default defineComponent({
  setup() {
    const route = useRoute()

    const { focusedPet, fetchPetByID, appendRecentlyViewed } = usePets()

    onMounted(async () => {
      const id = route.params.id

      await fetchPetByID(id)

      appendRecentlyViewed(focusedPet.value)
    })

    return {
      focusedPet,
    }
  },
})
</script>
