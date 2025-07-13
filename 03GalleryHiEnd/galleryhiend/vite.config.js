// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',      // current folder as root
  base: './',     // use relative paths for assets
  server: {
    port: 3000,
    open: true,
  },
})
