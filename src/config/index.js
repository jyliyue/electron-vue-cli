const { name, version } = require('../../package.json')

const config = {
    version: version,  // 版本号
    appName: name, // 鼠标悬停显示
    isAutoOpen: true, // 开机自启
    isOnlyOpen: true, // 窗口唯一
    isUseTray: true, // 使用托盘
    isDefineClose: true, // 自定义关闭按钮(最小化禁用关闭事件)
    isAutoUpdate: true, // 自动更新
    updateUrl: 'http://116.85.5.71:8080/', // 检测更新地址
}

export default config