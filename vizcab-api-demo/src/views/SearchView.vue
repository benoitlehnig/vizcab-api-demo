// src/views/SearchView.vue
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            <span>Product Search</span>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="logout">
              Logout
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="searchQuery"
              label="Search Products"
              prepend-icon="mdi-magnify"
              clearable
              @keyup.enter="search"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn 
              color="primary" 
              @click="search"
              :loading="productStore.loading"
            >
              Search
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="productStore.error">
      <v-col cols="12">
        <v-alert type="error">
          {{ productStore.error }}
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-if="productStore.loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else-if="productStore.searchResults.length > 0">
      <v-col 
        v-for="product in productStore.searchResults" 
        :key="product.id"
        cols="12" sm="6" md="4"
      >
        <v-card 
          class="mx-auto" 
          @click="viewProduct(product.epd.identification.vizcab_internal_id)"
          hover
        >
          <v-card-title>{{ product.epd.name}}</v-card-title>
          <v-card-subtitle>{{ product.epd.identification.po_registration_id }}</v-card-subtitle>
          <v-card-text>
            <div v-if="product.description">{{ product.epd.description.function }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click.stop="viewProduct(product.epd.identification.vizcab_internal_id)">
              View Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else-if="searched">
      <v-col cols="12">
        <v-alert type="info">
          No products found. Try a different search term.
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-if="productStore.searchResults.length > 0">
      <v-col cols="12">
        <v-pagination
          v-model="page"
          :length="totalPages"
          @update:modelValue="handlePageChange"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, computed } from 'vue'
import { useProductStore, useAuthStore } from '../store'
import { useRouter } from 'vue-router'

export default {
  name: 'SearchView',
  setup() {
    const searchQuery = ref('')
    const productStore = useProductStore()
    const authStore = useAuthStore()
    const router = useRouter()
    const page = ref(1)
    const limit = 10
    const searched = ref(false)

    const totalPages = computed(() => {
      return Math.ceil(productStore.totalResults / limit)
    })

    const search = async () => {
      if (!searchQuery.value) return
      
      searched.value = true
      await productStore.searchProducts(searchQuery.value, page.value, limit)
    }

    const handlePageChange = async (newPage) => {
      page.value = newPage
      await search()
    }

    const viewProduct = (id) => {
      router.push(`/product/${id}`)
    }

    const logout = () => {
      authStore.logout()
      router.push('/login')
    }

    return {
      searchQuery,
      productStore,
      search,
      viewProduct,
      page,
      totalPages,
      handlePageChange,
      searched,
      logout
    }
  }
}
</script>