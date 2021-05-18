import { reactive, ref, computed, toRaw, readonly } from 'vue'
import api from '../api'

// Booleans to manage loading states
const loadingList = ref(true)
const loadingPet = ref(true)

// List of queried pets
const petsList = reactive([])
// Pet object viewed in the PetDetail page
const focusedPet = reactive({})
// List of recenlty viewed pets
const recentlyViewed = reactive([])

// Lists of filter values
const typesList = reactive([])
const locationsList = reactive([])

// Search form values
// Packaged and sent as params to API
const params = reactive({
  type: 'Rabbit',
  location: 'Raleigh, NC',
  page: 1,
})

// Total number of pages available after query
const maxPage = ref(null)

// Non-reactive copy of previously queried params
let queriedParams = { ...toRaw(params) }

function SET_PETS_LIST(list, pagination) {
  petsList.value = list // Set petsList to returned list
  maxPage.value = pagination.total_pages // Set maxPage to number of total pages
  loadingList.value = false // Stop loading
}

function APPEND_PETS_LIST(list) {
  petsList.value = [...petsList.value, ...list] // Append new page to the end of current list
}

function SET_FOCUSED_PET(pet) {
  focusedPet.value = pet // Set focused pet to returned pet
  loadingPet.value = false // Stop loading
}

function SET_TYPES_LIST(list) {
  typesList.value = list
}

function SET_LOCATIONS_LIST(list) {
  locationsList.value = list
}

function APPEND_RECENTLY_VIEWED(pet) {
  // Get raw copy of recentlyViewed
  let recents = toRaw(recentlyViewed)

  // Check if pet already exists in recentlyViewed list
  const foundIndex = recents.findIndex((item) => item.id === pet.id)

  // If does exist, remove from previous position
  if (foundIndex > -1) recents.splice(foundIndex, 1)

  // Place pet at top of recents list
  recents.unshift(pet)

  // Trim list to be 5 items in length
  if (recents.length > 5) recents.splice(5)

  recentlyViewed.value = recents
}

function SAVE_QUERIED_FILTERS(params) {
  queriedParams = params // Save copy of previously queried params
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
    // If current page is equal to total pages, return
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

// Get copy of params object
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
