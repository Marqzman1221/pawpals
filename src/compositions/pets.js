import { reactive, ref, computed, toRaw, readonly } from 'vue'
import api from '../api'

const loadingList = ref(true)
const loadingPet = ref(true)

const petsList = reactive([])
const focusedPet = reactive({})
const recentlyViewed = reactive([])

const typesList = reactive([])
const locationsList = reactive([])

const params = reactive({
  type: 'Rabbit',
  location: 'Raleigh, NC',
  page: 1,
})
const maxPage = ref(null)

let queriedParams = { ...toRaw(params) }

function SET_PETS_LIST(list, pagination) {
  petsList.value = list
  maxPage.value = pagination.total_pages
  loadingList.value = false
}

function APPEND_PETS_LIST(list) {
  petsList.value = [...petsList.value, ...list]
}

function SET_FOCUSED_PET(pet) {
  focusedPet.value = pet
  loadingPet.value = false
}

function SET_TYPES_LIST(list) {
  typesList.value = list
}

function SET_LOCATIONS_LIST(list) {
  locationsList.value = list
}

function APPEND_RECENTLY_VIEWED(pet) {
  let recents = toRaw(recentlyViewed)

  const foundIndex = recents.findIndex((item) => item.id === pet.id)

  if (foundIndex > -1) recents.splice(foundIndex, 1)

  recents.unshift(pet)

  if (recents.length > 5) recents.splice(5)

  recentlyViewed.value = recents
}

function SAVE_QUERIED_FILTERS(params) {
  queriedParams = params
}

async function fetchPets() {
  try {
    loadingList.value = true
    params.page = 1
    const data = getPetParams()
    const response = await api.getAnimals(data)

    SET_PETS_LIST(response.animals, response.pagination)
    SAVE_QUERIED_FILTERS(data)
  } catch (error) {
    throw new Error(error)
  }
}

async function fetchPetsAppend() {
  try {
    if (params.page === maxPage.value) return

    params.page += 1
    const data = getPetParams()
    const response = await api.getAnimals(data)

    APPEND_PETS_LIST(response.animals)
  } catch (error) {
    throw new Error(error)
  }
}

async function fetchPetByID(id) {
  try {
    loadingPet.value = true
    const response = await api.getAnimalByID(id)

    SET_FOCUSED_PET(response.animal)
  } catch (error) {
    throw new Error(error)
  }
}

async function fetchTypes() {
  try {
    const response = await api.getAnimalTypes()
    const types = response.types.map((item) => item.name)

    SET_TYPES_LIST(types)
  } catch (error) {
    console.error(error)
  }
}

async function fetchLocations(prefix) {
  try {
    const response = await api.getLocations(prefix)
    if (!Array.isArray(response)) return

    const locations = response.map((item) => {
      return `${item.value}, ${item.state_code.substr(3, 2)}`
    })

    SET_LOCATIONS_LIST(locations)
  } catch (error) {
    console.error(error)
  }
}

function appendRecentlyViewed(pet) {
  APPEND_RECENTLY_VIEWED(pet)
}

const getPetParams = () => ({
  type: params.type,
  location: params.location,
  page: params.page,
})

export const usePets = () => ({
  // State
  params,
  // Actions
  fetchPets,
  fetchPetsAppend,
  fetchPetByID,
  fetchTypes,
  fetchLocations,
  appendRecentlyViewed,
  // Getters
  maxPage: readonly(maxPage),
  queriedParams: readonly(queriedParams),
  loadingList: computed(() => loadingList.value),
  loadingPet: computed(() => loadingPet.value),
  petsList: computed(() => petsList.value),
  focusedPet: computed(() => focusedPet.value),
  recentlyViewed: computed(() => recentlyViewed.value),
  typesList: computed(() => typesList.value),
  locationsList: computed(() => locationsList.value),
})
