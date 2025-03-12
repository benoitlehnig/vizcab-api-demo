// src/services/auth.service.js
import apiService from './api.service'

const authService = {
  login(email, password) {
    return apiService.post('/token/', {
      email,
      password
    })
  },
  
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }
}

export default authService