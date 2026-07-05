import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Vite gira sulla 5173 e inoltra /api al backend ASP.NET (http).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5187',
        changeOrigin: true,
      },
    },
  },
})
