import StreamDownload from './StreamDownload'
import fs from 'fs'
import cp from 'child_process'
import getPDFurl from './getPDFurl'
import getPDFPath from './getPDFPath'

const printer = {
    // 下载
    downloadFile: function (fileUrl, fileName) {
        let downloadMain = new StreamDownload()
        downloadMain.downloadFile(fileUrl, __static + '/order', fileName, downloadFileCallback)
    },
     // 解析推送消息
    getPDFData: function (res) {
        let tmp = JSON.parse(res.content)
        tmp.pdfUrl = getPDFurl(tmp)
        tmp.pdfPath = getPDFPath(tmp)
        return tmp
    }
}

// 下载成功回调
function downloadFileCallback(arg, fileName) {
    if (arg === "finished")
    {
        // 动作
        printing(fileName)
    }
}
// 打印文件
function printing(fileName) {
    let pdfUrl = __static + '/order/' + fileName + '.pdf' 
    cp.exec(
        'SumatraPDF.exe -print-to-default ' + pdfUrl, 
        {
            windowsHide: true,
            cwd: __static + '/SumatraPDF'
        }, 
        (e) => {
            fs.unlink(pdfUrl, e => {}) // 打印完成后，删除pdf文件
            if (e) {
                throw e;
            }
        }
    )
}


export default printer