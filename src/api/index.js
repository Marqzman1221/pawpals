import axios from 'axios'

const Axios = axios.create({
  baseURL: 'https://api.petfinder.com/v2/',
})

Axios.interceptors.request.use(
  async (config) => {
    const token = window.localStorage.getItem('accessToken')

    if (token === null) {
      const data = {
        grant_type: 'client_credentials',
        client_id: process.env.VUE_APP_CLIENT_ID,
        client_secret: process.env.VUE_APP_CLIENT_SECRET,
      }

      console.log(data)

      const response = axios.post('https://api.petfinder.com/v2/oauth2/token', {
        data: data,
      })
      const token = response.data.access_token
      window.localStorage.setItem('accessToken', token)
    }
    console.log(token)

    config.headers = {
      Authorization: `Bearer ${token}`,
      // Accept: 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      // 'Access-Control-Allow-Headers': '*',
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  (response) => {
    console.log(response.status)
    return response
  },
  (error) => {
    const originalRequest = error.config

    console.log(error.message)

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      const data = {
        grant_type: 'client_credentials',
        client_id: process.env.API_CLIENT_ID,
        client_secret: process.env.API_SECRET,
      }

      console.log(data)

      try {
        const response = axios.post(
          'https://api.petfinder.com/v2/oauth2/token',
          { data: data }
        )
        const token = response.data.access_token
        window.localStorage.setItem('accessToken', token)

        return Axios(originalRequest)
      } catch (error) {
        console.log(error)
      }
    }

    return Promise.reject(error)
  }
)

export default {
  async getAnimals(data, page = 1) {
    try {
      const response = await Axios.get('/animals', {
        params: { page: page, ...data },
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  async getAnimalByID(id) {
    try {
      const response = await Axios.get(`/animals/${id}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  async getAnimalTypes() {
    try {
      const response = await Axios.get('/types')
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  async getOrganizations() {
    try {
      const response = await Axios.get('/organizations')
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
}
