import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  //build: {
  //  outDir: 'dist',  // Ensure correct output directory
  //  sourcemap: true, // Helps debugging
  //},
})
