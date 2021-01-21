global.__static = '123'
if (process.env.NODE_ENV !== 'development') {
    
    // global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
  }

const config = {
    isAutoOpen: true, // 开机自启
    isAutoUpdate: true // 自动更新
}

export default config