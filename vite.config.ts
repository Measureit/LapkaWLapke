// @ts-nocheck
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { BASE_URL } from './src/config/app.config'

// https://vite.dev/config/
export default defineConfig({
  base: `${BASE_URL}/`, // Base URL dla aplikacji - używa stałej!
  plugins: [
    react()
  ],
  server: {
    port: 5175,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})