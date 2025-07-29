import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pine-time/',
  build: {
    minify: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/'),
    },
  },
})
