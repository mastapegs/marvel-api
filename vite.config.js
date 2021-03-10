import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/app-component.js',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit-element/
    }
  }
})
