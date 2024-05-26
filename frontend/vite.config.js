import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/register-user-server':'http://localhost:3000',
      '/login-user-server':'http://localhost:3000',
      '/register-property-server':'http://localhost:3000',
      '/update-property-server':'http://localhost:3000',
      '/api/get-properties':'http://localhost:3000',
      '/delete-property-server/':'http://localhost:3000',
    }
  }
})
