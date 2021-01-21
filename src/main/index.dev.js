/* 需要调试插件在此处引入 */

// Install `electron-debug` with `devtron`
require('electron-debug')({ showDevTools: true })

// Require `main` process to boot app
require('./index')