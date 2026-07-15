import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages menyajikan situs di /<nama-repo>/; host lain (Netlify dsb.) abaikan via env
  base: process.env.GITHUB_PAGES ? "/website-baru/" : "/",
  plugins: [react(), tailwindcss()],
})
