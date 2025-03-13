// src/services/auth.service.js
import apiService from './api.service'

const authService = {
  login(email, password) {
    return apiService.post('/token/', {
      email,
      password,
    })
  },

  logout() {},

  getCurrentUser() {},
}

export default authService
