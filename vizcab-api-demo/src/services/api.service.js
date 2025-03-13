// src/services/api.service.js
import axios from 'axios'
import { useAuthStore } from '../store' // Import the auth store

const API_URL = 'https://api.vizcab.io/' // Replace with your actual API base URL

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ✅ Optimized request interceptor
apiService.interceptors.request.use(
  (config) => {
    // Ensure store is accessed correctly
    const authStore = useAuthStore()

    if (authStore?.accessToken) {
      config.headers.Authorization = `JWT ${authStore.accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default apiService
