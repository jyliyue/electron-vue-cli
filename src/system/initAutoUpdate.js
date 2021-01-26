import { autoUpdater } from "electron-updater"
import { ipcMain, dialog } from 'electron'

function initAutoUpdate(app, mainWindow, updateUrl) {
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
    autoUpdater.setFeedURL(updateUrl)
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

export default initAutoUpdate