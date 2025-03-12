import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  base: './', // ✅ Fixes asset paths for GitHub Pages & Local Build
});
