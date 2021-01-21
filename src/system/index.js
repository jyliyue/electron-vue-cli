import config from '../config/index'
import initAutoOpen from './initAutoOpen'
import initAutoUpdate from './initAutoUpdate'
import initOnlyOpen from './initOnlyOpen'
import initUseTray from './initUseTray'

function initSys(app, mainWindow) {
    if (config.isAutoOpen) {
        initAutoOpen(app)
    }
    if (config.isAutoUpdate) {
        initAutoUpdate()
    }
    if (config.isOnlyOpen) {
        initOnlyOpen(app, mainWindow)
    }
    if (config.isUseTray) {
        initUseTray(app, mainWindow)
    }
}

export default initSys