// src/store/index.js
import { defineStore } from 'pinia'
import authService from '../services/auth.service'
import productService from '../services/product.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    loading: false,
    error: null
  }),
  
  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null
      console.log("login", email)
      try {
        const response = await authService.login(email, password)
        this.user = email
        this.accessToken = response.data.access
        this.refreshToken = response.data.refresh

        
        localStorage.setItem('user', JSON.stringify(email))
        localStorage.setItem('accessToken', response.data.access)
        localStorage.setItem('refreshToken', response.data.refresh)
        
        return true
      } catch (error) {
        this.error = error.response?.data?.message || 'Authentication failed'
        return false
      } finally {
        this.loading = false
      }
    },
    
    logout() {
      authService.logout()
      this.user = null
      this.accessToken = null
      this.refreshToken = null
      this.error = null
    }
  }
})

export const useProductStore = defineStore('product', {
  state: () => ({
    searchResults: [],
    currentProduct: null,
    loading: false,
    error: null,
    totalResults: 0,
    currentPage: 1
  }),
  
  actions: {
    async searchProducts(query, page = 0, limit = 10) {
      this.loading = true
      this.error = null
      
      try {
        const response = await productService.searchProducts(query, page, limit)
        this.searchResults = response.data.epds
        this.totalResults = response.data.count || response.data.results.length
        this.currentPage = page
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to search products'
        return null
      } finally {
        this.loading = false
      }
    },
    
    async getProductDetails(id) {
      this.loading = true
      this.error = null
      
      try {
        const response = await productService.getProductDetails(id)
        this.currentProduct = response.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to get product details'
        return null
      } finally {
        this.loading = false
      }
    }
  }
})