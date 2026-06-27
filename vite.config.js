import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed to Cloudflare Pages (villa235.pages.dev), served from root.
// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
})
