import { reactive, computed, readonly } from 'vue'
import axios from 'axios'

const Axios = axios.create({
  baseURL: 'https://api.petfinder.com/v2/',
})

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
    const filters = getPetFilters
    const response = await Axios.get('/animals', { params: filters })
    SET_PETS_LIST(response.data.animals)
  } catch (error) {
    console.log(error)
  }
}

async function fetchPetByID(id) {
  try {
    const response = await Axios.get(`/animals/${id}`)
    SET_FOCUSED_PET(response.data.animal)
  } catch (error) {
    console.log(error)
  }
}

async function fetchTypes() {
  try {
    const response = await Axios.get('/types')
    const types = response.data.types.map((item) => item.name)

    SET_TYPES_LIST(types)
  } catch (error) {
    console.log(error)
  }
}

async function fetchLocations() {
  try {
    const response = await Axios.get('/organizations')
    const locations = response.data.types.map((item) => {
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

const getPetFilters = computed(() => filters)

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
