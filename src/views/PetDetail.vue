<template>
  <div class="flex md:max-w-screen-md sm:max-w-screen-sm w-full my-2">
    <div v-if="loadingPet" class="flex flex-col w-full animate-pulse">
      <div class="flex mx-2">
        <div class="flex rounded-full bg-gray-200 h-11 w-32" />
      </div>
      <card class="flex-col">
        <div class="flex sm:flex-row flex-col sm:justify-start justify-center">
          <div class="flex justify-center">
            <div class="rounded bg-gray-200 w-64 h-64" />
          </div>
          <div
            class="
              flex flex-col
              sm:items-start
              items-center
              sm:ml-4
              sm:mt-0
              mt-2
            "
          >
            <div class="rounded-lg bg-gray-200 h-8 w-32" />
            <div class="flex flex-row mt-2">
              <div class="rounded bg-gray-200 h-7 w-16 mr-4"></div>
              <div class="rounded bg-gray-200 h-7 w-16"></div>
            </div>
          </div>
        </div>
        <div class="rounded-full bg-gray-200 my-4 w-full h-10" />
        <div class="flex-col p-2">
          <div class="rounded bg-gray-200 h-8 w-32" />
          <div class="rounded bg-gray-200 h-8 w-full mt-2" />
        </div>
        <div class="flex-col p-2">
          <div class="rounded bg-gray-200 h-8 w-32" />
          <div class="rounded bg-gray-200 h-24 w-full mt-2" />
        </div>
        <div class="flex-col p-2">
          <div class="rounded bg-gray-200 h-8 w-32" />
          <div class="rounded bg-gray-200 h-12 w-full mt-2" />
        </div>
        <div class="flex-col p-2">
          <div class="rounded bg-gray-200 h-8 w-32" />
          <div class="flex flex-row flex-wrap w-full mt-2">
            <div class="sm:w-48 w-1/2 h-48 p-1">
              <div class="rounded-lg bg-gray-200 w-full h-full" />
            </div>
            <div class="sm:w-48 w-1/2 h-48 p-1">
              <div class="rounded-lg bg-gray-200 w-full h-full" />
            </div>
            <div class="sm:w-48 w-1/2 h-48 p-1">
              <div class="rounded-lg bg-gray-200 w-full h-full" />
            </div>
            <div class="sm:w-48 w-1/2 h-48 p-1">
              <div class="rounded-lg bg-gray-200 w-full h-full" />
            </div>
          </div>
        </div>
      </card>
    </div>

    <div v-else class="flex flex-col">
      <div class="flex mx-2">
        <Button class="flex flex-row" outlined @click="backToList()"
          ><Icon class="mr-2" :path="mdiChevronLeft" />BACK</Button
        >
      </div>
      <card class="flex-col">
        <div class="flex sm:flex-row flex-col sm:justify-start justify-center">
          <div class="flex justify-center font-semibold text-xl">
            <div class="w-64 h-64">
              <img
                class="rounded-lg w-full h-full object-cover"
                :alt="focusedPet.name"
                :src="focusedPet.photos[0].large"
              />
            </div>
          </div>
          <div
            class="
              flex flex-col
              sm:items-start
              items-center
              sm:ml-4
              sm:mt-0
              mt-2
            "
          >
            <div class="text-2xl font-semibold">{{ focusedPet.name }}</div>
            <div class="font-light text-lg text-gray-500 font-light">
              {{ focusedPet.type }} ·
              {{
                `${focusedPet.contact.address.city}, ${focusedPet.contact.address.state}`
              }}
            </div>
          </div>
        </div>
        <Button
          v-show="focusedPet.status === 'adoptable'"
          class="my-4"
          block
          @click="openURL(focusedPet.url)"
        >
          ADOPT ME
        </Button>
        <div class="flex-col p-2">
          <div class="font-semibold text-xl">About Me</div>
          <div class="m-2">
            {{ focusedPet.age }} · {{ focusedPet.gender }} ·
            {{ focusedPet.size }}
          </div>
        </div>
        <div class="flex-col p-2">
          <div class="font-semibold text-xl">Contact</div>
          <div class="flex-col m-2">
            <div v-show="focusedPet.contact.email" class="flex flex-row">
              <icon class="mr-2 text-pink-600" :path="mdiEmailOutline" />
              <div>{{ focusedPet.contact.email }}</div>
            </div>
            <div v-show="focusedPet.contact.phone" class="flex mt-2 flex-row">
              <icon class="mr-2 text-pink-600" :path="mdiPhoneOutline" />
              <div>{{ focusedPet.contact.phone }}</div>
            </div>
            <div v-show="focusedPet.contact.address" class="flex mt-2 flex-row">
              <icon class="mr-2 text-pink-600" :path="mdiHomeCityOutline" />
              <div>
                {{ getAddressString() }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex-col p-2">
          <div class="font-semibold text-xl">Description</div>
          <div class="flex-col m-2">
            <div>{{ focusedPet.description }}</div>
          </div>
        </div>
        <div class="flex-col p-2">
          <div class="font-semibold text-xl">Photos</div>
          <div class="flex flex-row flex-wrap w-full mt-2">
            <div
              class="sm:w-48 sm:h-48 w-1/2 h-48"
              v-for="(item, index) in focusedPet.photos"
              :key="index"
            >
              <img
                class="rounded-lg w-full h-full m-0 p-1 object-cover"
                :alt="focusedPet.name"
                :src="item.medium"
              />
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePets } from '@/compositions/pets'
import Icon from '@/components/ui/Icon'
import Card from '@/components/ui/Card'
import {
  mdiChevronLeft,
  mdiEmailOutline,
  mdiPhoneOutline,
  mdiHomeCityOutline,
} from '@mdi/js'
import Button from '../components/ui/Button.vue'

export default defineComponent({
  components: { Card, Icon, Button },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const { loadingPet, focusedPet, fetchPetByID, appendRecentlyViewed } =
      usePets()

    function getAddressString() {
      if (!focusedPet.value.contact.address) return ''

      const address = focusedPet.value.contact.address

      const street = `${address.address1 ? address.address1 + ', ' : ''}`

      return `${street}${address.city}, ${address.state} ${address.postcode}`
    }

    onMounted(async () => {
      const id = route.params.id

      await fetchPetByID(id)

      appendRecentlyViewed(focusedPet.value)
    })

    function backToList() {
      router.push({
        name: 'Home',
      })
    }

    function openURL(url) {
      window.open(url, '_blank')
    }

    return {
      loadingPet,
      focusedPet,
      backToList,
      openURL,
      getAddressString,
      mdiChevronLeft,
      mdiEmailOutline,
      mdiPhoneOutline,
      mdiHomeCityOutline,
    }
  },
})
</script>
