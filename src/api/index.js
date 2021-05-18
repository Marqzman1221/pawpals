import { Client } from '@petfinder/petfinder-js'
import axios from 'axios'

// Initialize new Petfinder client using API client key and client secret
const pf = new Client({
  apiKey: process.env.VUE_APP_CLIENT_ID,
  secret: process.env.VUE_APP_CLIENT_SECRET,
})

// Create new axios instance
const Axios = axios.create()

export default {
  async getAnimals(data) {
    // Processed queryData object
    const queryData = {}

    // Iterate through keys in passed param data
    Object.keys(data).forEach((key) => {
      // If the value to a key is falsy,
      // do not include it in queryData
      if (data[key]) queryData[key] = data[key]
    })

    // If location param is provided, sort results by distance
    if (queryData['location']) queryData['sort'] = 'distance'

    return await pf.animal
      .search(queryData)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error)
      })
  },

  async getAnimalByID(id) {
    return await pf.animal
      .show(id)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error)
      })
  },

  async getAnimalTypes() {
    return await pf.animalData
      .types()
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error)
      })
  },

  async getLocations(location) {
    try {
      // Use additional Referential API provided by Rapid API
      // to search for locations
      const response = await Axios.get(
        'https://referential.p.rapidapi.com/v1/city',
        {
          params: {
            fields: 'name, state_code', // Return to me the location name and state code, i.e. city and state
            iso_a2: 'us', // Restrict to United States
            lang: 'en', // Set language to English
            name: location,
            prefix: location,
          },
          headers: {
            'x-rapidapi-key': process.env.VUE_APP_RAPID_API_KEY,
            'x-rapidapi-host': 'referential.p.rapidapi.com',
          },
        }
      )

      return response.data
    } catch (error) {
      return error
    }
  },
}
