import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: false,
    allowedHosts: ['tonjklcnllir.usw.sealos.io'],
    // 如果需要HTTPS，可以取消注释下面的行
    // https: true
  }
}) 