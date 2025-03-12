// src/services/api.service.js
import axios from 'axios'

const API_URL = 'https://api.vizcab.io/' // Replace with your actual API base URL

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor for adding auth token
apiService.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers['Authorization'] = `JWT ${accessToken}`
    }
    return config
  },
  error => Promise.reject(error)
)

export default apiService