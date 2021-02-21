import { dialog } from 'electron'
import electron from 'electron'
import config from '../config/index'
// 用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区 ，通常被添加到一个 context menu 上.
const Menu = electron.Menu;
const Tray = electron.Tray;
// 托盘对象
let appTray = null;
function initUseTray(app, mainWindow) {
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
                    message: '是否确认退出？',
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
    appTray.setToolTip(config.appName)
    //设置此图标的上下文菜单
    appTray.setContextMenu(contextMenu)
    //单击右下角小图标显示应用
    appTray.on('click',function(){
        mainWindow.show();
    })
}

export default initUseTray
