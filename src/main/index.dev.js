// Install `electron-debug` with `devtron`
require('electron-debug')({ showDevTools: true })

// Require `main` process to boot app
require('./index')