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
  
  getProductImpacts(id) {
    return apiService.post('/impacts/new',{
      components: [
        {
          "epd_id": id,
          "reference_service_life": 50,
          "quantity": 1,
          "config": "re2020",
          }
      ]
    
  })
  },

  getProductDetails(id) {
    return apiService.get(`/epd/${id}`)
  }
}

export default productService