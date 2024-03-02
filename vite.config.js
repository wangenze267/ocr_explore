import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  // 代理配置
  server: {
    proxy: {
      '/api': { // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
        target: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general', // 目标地址 --> 服务器地址
        changeOrigin: true, // 允许跨域
        ws: true,  // 允许websocket代理
        // 重写路径 --> 作用与vue配置pathRewrite作用相同
        rewrite: (path) => path.replace(/^\/api/, "")
      }
     },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
