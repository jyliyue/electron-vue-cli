import path from 'path'
import electron from 'electron'
import { ipcMain, dialog } from 'electron'
import { autoUpdater } from "electron-updater"
import config from '../../../config/index'
const setting = {
    // 打开唯一
    onlyOppen: function(app, mainWindow) {
        app.requestSingleInstanceLock((commandLine, workingDirectory) => {
            if (mainWindow) {
                if (mainWindow.isMinimized()) mainWindow.restore()
                mainWindow.focus()
                mainWindow.show()
            }
        })
    },
    // 开机自启
    autoOpen: function(app) {
        const exeName = path.basename(process.execPath)
        app.setLoginItemSettings({
            openAtLogin: true,
            openAsHidden: false,
            path: process.execPath,
            args: [
                '--processStart', `"${exeName}"`,
            ]
        })
    },
    // 托盘最小化
    initTray: function(app, mainWindow) {
        // 用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区 ，通常被添加到一个 context menu 上.
        const Menu = electron.Menu;
        const Tray = electron.Tray;
        // 托盘对象
        let appTray = null;
        // 定义托盘
          // 系统托盘菜单
        let trayMenuTemplate = [
            {
                label: '打开',
                click: function () {
                    mainWindow.show();
                }
            },
            {
                label: '退出',
                click: function () {
                    dialog.showMessageBox({
                        type: 'info',
                        title: '关闭',
                        message: '关闭程序将导致打印功能不可用，是否确认退出？',
                        buttons: ['最小化','直接退出']
                    }, res => {
                        if (res === 0) {
                            if(mainWindow.isMinimized()){
                                mainWindow = null;
                            }else{
                                mainWindow.minimize();
                            }
                        } else {
                            mainWindow = null;
                            app.exit();		//exit()直接关闭客户端，不会执行quit();
                        }
                    })
                }
            }
        ]
        // 系统托盘图标
        let trayIcon = __static + '/icons/icon.png'
        appTray = new Tray(trayIcon)
        //图标的上下文菜单
        const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)
        //设置此托盘图标的悬停提示内容
        appTray.setToolTip('顾家移动打印客户端')
        //设置此图标的上下文菜单
        appTray.setContextMenu(contextMenu)
        //单击右下角小图标显示应用
        appTray.on('click',function(){
            mainWindow.show();
        })
    },
    // 设置更新
    initUpdate: function(app, mainWindow) {
        // 通过main进程发送事件给renderer进程，提示更新信息
        function sendUpdateMessage(text) {
            mainWindow.webContents.send('message', text)
        }
        // 更新状态
        const returnData = {
            error: { status: -1, msg: '检测更新查询异常' },
            checking: { status: 0, msg: '正在检查应用程序更新' },
            updateAva: { status: 1, msg: '检测到新版本，正在下载,请稍后' },
            updateNotAva: { status: -2, msg: '您现在使用的版本为最新版本,无需更新!' },
        }
        // 设置更新地址
        autoUpdater.setFeedURL(config.updateUrl)
        // 更新错误
        autoUpdater.on('error', function (error) {
            sendUpdateMessage(error)
        })
        //检查中
        autoUpdater.on('checking-for-update', () => {
            sendUpdateMessage(returnData.checking)
        })
        //发现新版本
        autoUpdater.on('update-available', function (info) {
            sendUpdateMessage(returnData.updateAva)
        })
        //当前版本为最新版本
        autoUpdater.on('update-not-available', function (info) {
            setTimeout(function () {
                sendUpdateMessage(returnData.updateNotAva)
            }, 1000);
        })
        // 更新下载进度事件
        autoUpdater.on('download-progress', function (progressObj) {
            setTimeout(function () {
                sendUpdateMessage(100)
            }, 1000);
            mainWindow.webContents.send('downloadProgress', progressObj)
        })
        // 下载成功回调
        autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
            ipcMain.on('isUpdateNow', (e, arg) => {
                //some code here to handle event
                autoUpdater.quitAndInstall();
            });
            mainWindow.webContents.send('isUpdateNow')
        })
        //执行自动更新检查
        ipcMain.on('checkForUpdate', (event, res) => {
            console.log('执行更新')
            autoUpdater.checkForUpdates()
        })
    }
}

export default setting