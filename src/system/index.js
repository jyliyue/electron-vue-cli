import config from '../config/index'
import initAutoOpen from './initAutoOpen'
import initAutoUpdate from './initAutoUpdate'
import initOnlyOpen from './initOnlyOpen'

function initSys(app) {
    if (config.isAutoOpen) {
        initAutoOpen(app)
    }
    if (config.isAutoUpdate) {
        initAutoUpdate()
    }
    if (config.isOnlyOpen) {
        initOnlyOpen()
    }
}

export default initSys