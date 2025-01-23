import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/signServer':'http://basic_backend:8080'
      /* '/signServer':'http://localhost:8080' */
    }
  },
  build: {
    outDir: 'build' // Çıktı dizinini 'build' olarak ayarlayın
  }
})


