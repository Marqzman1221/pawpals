import { reactive, readonly } from 'vue'
import api from '../api'

const petsList = reactive([])
const focusedPet = reactive({})
const recentlyViewed = reactive([])

const typesList = reactive(['Rabbit', 'Dog', 'Cat', 'Bird', 'Lizard', 'Fish'])
const locationsList = reactive([
  'Raleigh',
  'New York City',
  'Atlanta',
  'Los Angeles',
  'Denver',
  'Seattle',
])

const filters = reactive({
  type: '',
  location: '',
})

function SET_PETS_LIST(list) {
  petsList.value = list
}

function SET_FOCUSED_PET(pet) {
  focusedPet.value = pet
}

function SET_TYPES_LIST(list) {
  typesList.value = list
}

function SET_LOCATIONS_LIST(list) {
  locationsList.value = list
}

function APPEND_RECENTLY_VIEWED(pet) {
  recentlyViewed.push(pet)
}

async function fetchPets() {
  try {
    const data = getPetFilters()
    const response = await api.getAnimals(data)
    SET_PETS_LIST(response.animals)
  } catch (error) {
    console.log(error)
  }
}

async function fetchPetByID(id) {
  try {
    const response = await api.getAnimalByID(id)
    SET_FOCUSED_PET(response.animal)
  } catch (error) {
    console.log(error)
  }
}

async function fetchTypes() {
  try {
    const response = await api.getAnimalTypes()
    const types = response.types.map((item) => item.name)

    SET_TYPES_LIST(types)
  } catch (error) {
    console.log
  }
}

async function fetchLocations() {
  try {
    const response = await api.getOrganizations()
    const locations = response.organizations.map((item) => {
      return `${item.address.city}, ${item.address.state}`
    })

    SET_LOCATIONS_LIST(locations)
  } catch (error) {
    console.log(error)
  }
}

function appendRecentlyViewed(pet) {
  APPEND_RECENTLY_VIEWED(pet)
}

const getPetFilters = () => ({
  type: filters.type,
  location: filters.location,
})

export const usePets = () => ({
  // State
  filters,
  // Actions
  fetchPets,
  fetchPetByID,
  fetchTypes,
  fetchLocations,
  appendRecentlyViewed,
  // Getters
  petsList: readonly(petsList),
  focusedPet: readonly(focusedPet),
  recentlyViewed: readonly(recentlyViewed),
  typesList: readonly(typesList),
  locationsList: readonly(locationsList),
})
