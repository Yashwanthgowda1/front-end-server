import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 3000,
    // open: true
    proxy: {
      '/api': "http://localhost:3001"
    },
    // Remove proxy configuration - we'll use direct API calls
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})