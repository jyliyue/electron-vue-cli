import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import electron from 'electron'
import initSys from '../system/index.js'


if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// // 用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区 ，通常被添加到一个 context menu 上.
// const Menu = electron.Menu;
// const Tray = electron.Tray;
// // 托盘对象
// let appTray = null;
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 512,
    width: 720,
    skipTaskbar: true,
    icon: __static+'/icons/icon.ico' // sets window icon
  })
  mainWindow.loadURL(winURL)
  // 初始化系统配置
  initSys(app, mainWindow)
}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

