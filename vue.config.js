module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },

  devServer: {
    // development server port 8000
    port: 8080,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      '/backend': {
        target: 'http://192.168.134.2:9800/backend', // 你接口的域名
        changeOrigin: true,
        ws: true
      },
      '/assist': {
        target: 'http://192.168.134.2:9800', // 你接口的域名
        changeOrigin: true,
        ws: true
      }
    },
    hot: true
  }
}
