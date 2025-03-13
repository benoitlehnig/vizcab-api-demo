// src/views/SearchView.vue
<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title text="Product Search"></v-toolbar-title>

      <v-spacer></v-spacer>
      <v-text-field
        density="compact"
        v-model="searchQuery"
        label="Search Products"
        clearable
        prepend-inner-icon="mdi-magnify"
        variant="solo"
        width="200"
        flat
        hide-details
        single-line
        @keyup.enter="search"
      ></v-text-field>
      <v-spacer></v-spacer>

      <v-btn icon="mdi-export" @click="logout"></v-btn>
    </v-toolbar>
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

    <v-row dense v-else-if="productStore.searchResults.length > 0" class="mt-4">
      <v-col v-for="product in productStore.searchResults" :key="product.id" md="4" cols="auto">
        <v-card
          class="pb-3"
          border
          flat
          @click="viewProduct(product.epd.identification.vizcab_internal_id)"
          hover
        >
          <v-list-item :subtitle="product.epd.name" class="mb-2">
            <template v-slot:title>
              <strong class="text-h6 mb-2 text-truncate">{{ product.epd.name }}</strong>
            </template>
          </v-list-item>
          <div class="d-flex justify-space-between px-4">
            <div class="d-flex align-center text-caption text-medium-emphasis me-1">
              <v-icon icon="mdi-identifier" start></v-icon>

              <div class="text-truncate">{{ product.epd.identification.po_registration_id }}</div>
            </div>

            <v-btn
              class="text-none"
              size="small"
              text="More info"
              variant="flat"
              border
              @click.stop="viewProduct(product.epd.identification.vizcab_internal_id)"
            >
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else-if="searched">
      <v-col cols="12">
        <v-alert type="info"> No products found. Try a different search term. </v-alert>
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
import PDFThumbnail from '../components/PDFThumbnail.vue'

export default {
  name: 'SearchView',
  components: {
    PDFThumbnail,
  },
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
      console.log(productStore.searchResults)
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
      logout,
    }
  },
}
</script>
