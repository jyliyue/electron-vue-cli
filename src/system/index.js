import config from '@/config/index'
import initAutoOpen from './initAutoOpen'
import initAutoUpdate from './initAutoUpdate'

function initSys() {
    if (config.isAutoOpen) {
        initAutoOpen()
    }
    if (config.isAutoUpdate) {
        initAutoUpdate()
    }
}

export default initSys