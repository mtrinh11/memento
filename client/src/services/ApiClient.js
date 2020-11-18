import axios from 'axios'

const ApiClient = axios.create({ 
  baseURL: 
    process.env.NODE_ENV === 'production' 
    ?
    `${window.location.origin}/api`
    : 
    `${process.env.REACT_APP_API_URL}`  
})

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
