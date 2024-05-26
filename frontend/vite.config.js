import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/register-user-server':'http://localhost:3000',
      '/login-user-server':'http://localhost:3000',
    }
  }
})
