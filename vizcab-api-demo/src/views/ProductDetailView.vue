// src/views/ProductDetailView.vue
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="goBack">
          <v-icon left>mdi-arrow-left</v-icon>
          Back to Search
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="productStore.loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else-if="productStore.error">
      <v-col cols="12">
        <v-alert type="error">
          {{ productStore.error }}
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-else-if="productStore.currentProduct">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            {{ productStore.currentProduct.name }}
          </v-card-title>
          <v-card-subtitle>
            ID: {{ productStore.currentProduct.identification.po_registration_id
 }}
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <h3>Product Information</h3>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>Manufacturer:</v-list-item-title>
                    <v-list-item-subtitle>{{ productStore.currentProduct.manufacturer.name }}</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Functional Unit:</v-list-item-title>
                    <v-list-item-subtitle>{{ productStore.currentProduct.declared_unit.name }}</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Reference Service Life (years):</v-list-item-title>
                    <v-list-item-subtitle>{{ productStore.currentProduct.modelling.reference_service_life }}</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Type:</v-list-item-title>
                    <v-list-item-subtitle>{{ productStore.currentProduct.modelling.subtype.name }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" md="6">
                <h3>Impacts (for 1 UF over 50 years)</h3>
                  <v-list>
                    <v-list-item v-for="(impactValues, impactKey) in productStore.currentProduct.impacts.details[0].impacts" key="impactKey">
                      <v-list-item-title>{{ impactKey}}</v-list-item-title>
                      <v-list-item-subtitle> </v-list-item-subtitle>
                      <ul>
                        <li v-for="(value, key) in impactValues" :key="key">
                          {{ key }}: {{ value }}
                        </li>
                      </ul>
                    </v-list-item>
                  </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <v-alert type="warning">
          Product not found
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useProductStore } from '../store'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'ProductDetailView',
  setup() {
    const productStore = useProductStore()
    const router = useRouter()
    const route = useRoute()

    // Main product properties we want to display
    const displayProperties = computed(() => {
      if (!productStore.currentProduct ) return {}
      const { id, name, description, ...rest } = productStore.currentProduct
      // Filter out properties we want to show in main section
      const mainProps = {}
      
      // Customize which properties show in main display
      if (rest.category) mainProps.category = rest.category
      if (rest.price) mainProps.price = `$${rest.price}`
      if (rest.manufacturer) mainProps.manufacturer = rest.manufacturer
      if (rest.code) mainProps.code = rest.code
      if (rest.status) mainProps.status = rest.status
      
      return mainProps
    })
    
    // Additional details that we'll show in the second column
    const extraDetails = computed(() => {
      if (!productStore.currentProduct) return []
      
      const { id, name, description, ...rest } = productStore.currentProduct
      const excluded = ['category', 'price', 'manufacturer', 'code', 'status'] 
      
      return Object.entries(rest)
        .filter(([key]) => !excluded.includes(key))
        .map(([key, value]) => ({ key, value }))
    })

    const formatKey = (key) => {
      return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
    }

    const goBack = () => {
      router.push('/search')
    }

    onMounted(async () => {
      const productId = route.params.id
      if (productId) {
        await productStore.getProductDetails(productId)
      }
    })

    return {
      productStore,
      displayProperties,
      extraDetails,
      formatKey,
      goBack
    }
  }
}
</script>