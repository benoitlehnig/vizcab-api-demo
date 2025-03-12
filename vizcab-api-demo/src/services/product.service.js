// src/services/product.service.js
import apiService from './api.service'

const productService = {
  searchProducts(query_string, query_from = 0, query_size = 10) {
    return apiService.post('/epd/intl_search', {
  
        query_string,
        query_from,
        query_size
      
    })
  },
  
  getProductDetails(id) {
    return apiService.post(`/impacts/new/${id}`)
  }
}

export default productService