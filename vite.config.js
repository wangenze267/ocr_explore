import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'

import { defineConfig } from 'vite'
import { DevUiResolver } from 'unplugin-vue-components/resolvers'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        DevUiResolver
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
