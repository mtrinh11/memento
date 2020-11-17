import axios from 'axios'

const ApiClient = axios.create({ baseURL: process.env.REACT_APP_API_URL  })

ApiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

export default ApiClient
