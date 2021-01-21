import path from 'path'

function initAutoOpen(app) {
    const exeName = path.basename(process.execPath)
    app.setLoginItemSettings({
        openAtLogin: true, // 登录启动
        openAsHidden: false, // mac 以隐藏方式启动
        path: process.execPath, // 启动时的执行文件 
        args: [
            '--processStart', `"${exeName}"`,
        ]  // 命令参数
    })
}

export default initAutoOpen