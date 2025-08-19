import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://movies-3-4t70.onrender.com', // Your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
