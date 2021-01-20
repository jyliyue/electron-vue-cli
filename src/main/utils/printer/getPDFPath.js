// import config from '../config'
import { app } from 'electron'
import path from 'path'

function getPDFPath(data) {
    let tmp = path.join(app.getAppPath(), './static/order/' + data.fileName + '.pdf' )
    return tmp
}

export default getPDFPath