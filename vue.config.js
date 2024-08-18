const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 开发环境 服务器端配置
  // 开发环境 反向代理配置
  devServer: {
    // 反向代理
    proxy: {
      // 代理路径 http://127.0.0.1:8080
      // 即将 http://127.0.0.1:8080 替代服务器端 http://127.0.0.1:8001            亦可
      '/api': {
        // 代理的服务器端目标路径
        target: 'http://127.0.0.1:8001',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }
})
