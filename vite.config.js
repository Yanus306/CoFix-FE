import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // /auth 로 시작하는 요청을 백엔드로 우회
      '/auth': {
        target: 'https://cofix.jongyeol.kr',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})