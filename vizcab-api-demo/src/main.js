// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
// Ensure Vue mounts only after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  app.mount('#app')
})
