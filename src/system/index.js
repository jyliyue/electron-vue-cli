import config from '../config/index'
import initAutoOpen from './initAutoOpen'
import initAutoUpdate from './initAutoUpdate'

function initSys(app) {
    if (config.isAutoOpen) {
        initAutoOpen(app)
    }
    if (config.isAutoUpdate) {
        initAutoUpdate()
    }
}

export default initSys