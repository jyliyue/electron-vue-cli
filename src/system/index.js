import config from '../config/index'
import initAutoOpen from './initAutoOpen'
import initAutoUpdate from './initAutoUpdate'
import initOnlyOpen from './initOnlyOpen'
import initUseTray from './initUseTray'
import initDefineClose from './initDefineClose'

function initSys(app, mainWindow) {
    if (config.isAutoOpen) {
        initAutoOpen(app)
    }
    if (config.isAutoUpdate) {
        if (!config.updateUrl) {
            console.log('Please set updateUrl right!')
        } else {
            initAutoUpdate(app, mainWindow, config.updateUrl)
        }
    }
    if (config.isOnlyOpen) {
        initOnlyOpen(app, mainWindow)
    }
    if (config.isUseTray) {
        initUseTray(app, mainWindow)
    }
    if (config.isDefineClose) {
        initDefineClose(app, mainWindow)
    }
}

export default initSys