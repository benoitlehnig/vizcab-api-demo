<template>
  <div class="pdf-thumbnail-container" ref="thumbnailContainer">
    <div v-if="isLoading" class="loading-state">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-if="errorMessage" class="error-state">
      <v-icon color="error">mdi-alert-circle</v-icon>
      <span>{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'PDFThumbnail',
  props: {
    pdfUrl: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 280,
    },
  },
  setup(props) {
    const thumbnailContainer = ref(null)
    const isLoading = ref(true)
    const errorMessage = ref('')

    onMounted(async () => {
      // Only import WebViewer when component is mounted (client-side only)
      try {
        const WebViewer = (await import('@pdftron/pdfjs-express')).default
        console.log('WebViewer:', props.pdfUrl)
        // Initialize WebViewer
        const instance = await WebViewer(
          {
            path: '/public/lib', // Path to PDF.js Express assets
            licenseKey: 't6hUE8ACEGUUU9eIzUeX', // Replace with your license key
            initialDoc: props.pdfUrl,
            disabledElements: [
              'ribbons',
              'toolsHeader',
              'leftPanel',
              'searchPanel',
              'menuOverlay',
              'contextMenuPopup',
            ],
          },
          thumbnailContainer.value
        )

        const { documentViewer, CoreControls } = instance

        // Once document is loaded
        documentViewer.addEventListener('documentLoaded', async () => {
          try {
            isLoading.value = false

            // Generate thumbnail
            const doc = documentViewer.getDocument()
            const pageNumber = 1
            const drawComplete = (pageNum) => (canvasHeight) => {
              // Thumbnail is now rendered
              console.log(`Thumbnail for page ${pageNum} rendered`)
            }
            console.log('doc', doc)
            // Render the first page as a thumbnail
            doc.loadCanvas({
              pageNumber,
              width: props.width,
              height: props.height,
              drawComplete,
              // This ensures the container fits the thumbnail
              containerHeight: props.height,
            })
          } catch (err) {
            console.error('Error generating thumbnail:', err)
            errorMessage.value = 'Failed to generate thumbnail'
            isLoading.value = false
          }
        })
      } catch (err) {
        console.error('Error loading WebViewer:', err)
        errorMessage.value = 'Failed to load PDF viewer'
        isLoading.value = false
      }
    })

    return {
      thumbnailContainer,
      isLoading,
      errorMessage,
    }
  },
})
</script>

<style scoped>
.pdf-thumbnail-container {
  width: 100%;
  height: 280px;
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.loading-state,
.error-state {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.error-state {
  color: #d32f2f;
}
</style>
