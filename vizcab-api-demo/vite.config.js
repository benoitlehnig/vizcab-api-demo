import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command }) => ({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  base: command === 'serve' ? '/' : '/vizcab-api-demo/', // ✅ Dynamic base path
}));
