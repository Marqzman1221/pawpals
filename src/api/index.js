import { Client } from '@petfinder/petfinder-js'
import axios from 'axios'

const pf = new Client({
  apiKey: process.env.VUE_APP_CLIENT_ID,
  secret: process.env.VUE_APP_CLIENT_SECRET,
})

const Axios = axios.create()

export default {
  async getAnimals(data) {
    const queryData = {}
    Object.keys(data).forEach((key) => {
      if (data[key]) queryData[key] = data[key]
    })

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
      const response = await Axios.get(
        'https://referential.p.rapidapi.com/v1/city',
        {
          params: {
            fields: 'name, state_code',
            iso_a2: 'us',
            lang: 'en',
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
