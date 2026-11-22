import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:8765',
      '/question': 'http://localhost:8765',
      '/quiz': 'http://localhost:8765'
    }
  }
})
