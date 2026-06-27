import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed to GitHub Pages under /villa235/. For a root domain (villa235.com),
// set base to '/' and rebuild.
// https://vite.dev/config/
export default defineConfig({
  base: '/villa235/',
  plugins: [react()],
})
