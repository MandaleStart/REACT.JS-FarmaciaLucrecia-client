import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import alias from '@rollup/plugin-alias'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: [
        { find: '@utils', replacement: resolve(__dirname, 'src/utils') },
        { find: '@components', replacement: resolve(__dirname, 'src/components') },
        { find: '@fire', replacement: resolve(__dirname, 'src/fire') },
        
      ],
    }),
  ],
  server: {
    port: 3000, // Cambia el puerto 
  },
})
