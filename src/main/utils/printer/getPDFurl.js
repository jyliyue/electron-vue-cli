import config from '../../../config'

function getPDFurl(data) {
    let tmp = config.frHost + 
    "webroot/ReportServer?sysEnv=1&reportlet=ls/" + data.printTemplateType + 
    ".cpt&orderId=" + data.orderId + 
    "&orgId=" + data.orgId + 
    "&orderTypeCode=" + data.orderTypeCode +
    "&printUserCode=" + data.printUserCode +
    "&printUserName=" + data.printUserName +
    "&op=view&&format=pdf&extype=simple+&__filename__=" + data.fileName
    return encodeURI(tmp)
}

export default getPDFurl