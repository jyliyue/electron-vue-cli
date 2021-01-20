<template>
  <div id="wrapper">
    <main>
      <div class="container">
        <div class="left">
          <div class="title">
            欢迎使用顾家移动打印{{ env }}
          </div>
          <div class="qr">
            <div class="qr-content">
              <vue-qr :logoSrc="imageUrl" :text="macId" :size="180"></vue-qr>
              <div class="qrcode">
                {{ macId }}
              </div>
            </div>
          </div>
          <div class="msg">
            请使用小程序扫码关联打印机设备
          </div>
        </div>
        <div class="right">
          <div class="help-box">
            <button @click="helpHandle" >帮助服务</button>
          </div>
          <div class="title">
            <div class="title-left">打印记录</div>
            <div class="title-right">状态：{{ state }}</div>
          </div>
          <div class="log-container">
            <div class="empty-bar" v-if="!list.length" >
              <img :src="printerUrl" alt="">
              <span>您还没有打印过任何内容</span>
            </div>
            <div class="log-list" v-else>
              <div class="item" v-for="(item, i) in list" :key="i">
                <div class="info">
                  <div class="orderNo">{{ item.fileName }}</div>
                  <div class="printUser">{{ item.saleName }}</div>
                </div>
                <div class="time">
                  {{ item.time }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <update :show.sync="show" :percent="percent"></update>
      <help-box :isShow="showHelp" @on-close="helpHandle" :top-distance="20" >
        <div slot="header">帮助服务</div>
        <div class="dialog_publish_main" slot="main">
            <div class="qr-content">
              <vue-qr :logoSrc="imageUrl" :text="docUrl" :size="180"></vue-qr>
              <div class="qrcode">
                扫码查看操作手册
              </div>
              <div class="qrcode" style="margin-top: 5px">
                注意这个不是打印机识别码
              </div>
            </div>
            <div class="main-content">
              <div class="item">
                <div class="item-url">
                  <a href="#" @click="openUrl(docUrl)">
                    {{ docUrl }}
                  </a>
                </div>
                <div class="item-text">查看移动打印操作手册</div>
              </div>
              <div class="item">
                <div class="item-url">
                  <a href="#" @click="openUrl(helpUrl)">
                    {{ helpUrl }}
                  </a>
                </div>
                <div class="item-text">联系在线客服</div>
              </div>
              <div class="close-btn">
                <button @click="helpHandle">关闭</button>
              </div>
            </div>
        </div>
      </help-box>
    </main>
  </div>
</template>

<script>
  // import SystemInformation from './LandingPage/SystemInformation'
  import config from '../../config'
  import GoEasy from 'goeasy'
  import { ipcRenderer } from 'electron'
  import {machineId, machineIdSync} from 'node-machine-id'
  import vueQr from 'vue-qr'
  import update from "@/components/update";
  import helpBox from "@/components/helpBox";
  import electron from 'electron'
  export default {
    name: 'landing-page',
    data() {
      return {
        macId: '',
        env: '',
        list: [],
        goEasyModule: {},
        imageUrl: require('../../../static/logo/logo.png'),
        printerUrl: require('../../../static/icons/printer.png'),
        state: '连接中',
        percent: 0,
        show: false,
        showHelp: false,
        docUrl: 'http://kukadoc.kukahome.com:4999/web/#/p/8f2cfbd9dc8d1fc182bd5e580f3bf9b1',
        helpUrl: 'https://cschat.antcloud.com.cn/index.htm?tntInstId=4Ch_IQbR&scene=SCE00038833#/'
      }
    },
    created() {
      this.init()
    },
    mounted() {
      ipcRenderer.on("message", (event, data) => {
        if (data.status == 1) {
          this.show = true;
        }
      });
      ipcRenderer.on("downloadProgress", (event, data) => {
        this.percent = Number(parseFloat(data.percent).toFixed(2));
        if (this.percent >= 100) {
          this.show = false;
        }
      });
      ipcRenderer.on("isUpdateNow", () => {
        ipcRenderer.send("isUpdateNow");
      });
    },
    components: { vueQr, update, helpBox },
    methods: {
      init() {
        this.checkUpdate()
        this.env = config.env ? '-' + config.env : ''
        this.getMacId()
        this.goEasyModule = new GoEasy({
            host: config.goHost, 
            appkey: config.appKey, 
            onConnected: () => {
                this.subscribeStore()
                this.state = '已连接'
                console.log('连接成功！')
            },
            onDisconnected: () => {
                this.reConnect()
                this.state = '连接中'
                console.log('连接断开！')
            },
            onConnectFailed: (error) => {
                this.reConnect()
                this.state = '连接中'
                console.log('连接失败或错误！')
            }
        })
      },
      // 订阅门店
      subscribeStore () {
        this.goEasyModule.subscribe({
            channel: this.macId,
            onMessage: (res) => {
                let time = new Date().toLocaleTimeString()
                let data = JSON.parse(res.content)
                console.log('收到推送' + time)
                this.list.push({
                    time: time,
                    channel: res.channel,
                    fileName: this.filterName(data.fileName),
                    saleName: data.printUserName
                })
                this.handlePrint(res)
            }
        })
      },
      // 发起打印
      handlePrint(res) {
        if(!ipcRenderer) return
        ipcRenderer.send('print-start', res)
      },
      // 重新连接
      reConnect() {
        this.goEasyModule.reconnect()
      },
      // 断开连接
      disconnect() {
        this.goEasyModule.disconnect()
      },
      // 取消订阅
      unSubscribe() {
        this.goEasyModule.unsubscribe({
          channel: this.macId,
          onSuccess: function () {
              console.log('订阅取消成功')
              // alert("订阅取消成功。");
          },
          onFailed: function (error) {
              // alert("取消订阅失败，错误编码：" + error.code + " 错误信息：" + error.content)
          }
        })
      },
      // 获取本机id
      getMacId: function () {
        let id = machineIdSync({original: true})
        this.macId = id
        // console.log(id)
      },
      // 格式化文件名
      filterName: function (text) {
        let tmp = text.slice(0, -5)
        return tmp
      },
      // 检测更新
      checkUpdate() {
        ipcRenderer.send("checkForUpdate", 'start')
      },
      // 调用窗口
      helpHandle() {
        this.showHelp = !this.showHelp
      },
      // 打开外部链接
      openUrl(url) {
        electron.shell.openExternal(url)
      }
    }
  }
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
}

.left {
  flex: 2;
  height: 100vh;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-content: center;
}

.left .title {
  font-size: 24px;
  font-weight: 900;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 36px;
}

.left .qr {
  width: 280px;
  height: 280px;
  margin: 0 auto;
  margin-top: 36px;
  border: 10px solid blue;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr .qr-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.qrcode {
  margin-top: -10px;
  font-family: Source Han Sans CN;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height */
  text-align: center;
  color: rgba(0, 0, 0, 0.822);
}

.left .msg {
  margin-top: 10px;
  font-family: Source Han Sans CN;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */
  text-align: center;
  color: rgba(0, 0, 0, 0.59);
}

.right {
  flex: 1;
  height: 100vh;
  background: #F8F8F8;
  box-sizing: border-box;
  padding: 15px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.right .help-box {
  display: flex;
  flex-direction: row-reverse;
}

.help-box button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  height: 35px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  padding: 0 20px;
  cursor: pointer;
}

.right .title {
  margin-top: 10px;
  font-family: Source Han Sans CN;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */
  /* text-align: center; */
  color: #000000;
  display: flex;
}
.title-left {
  flex: 1;
}
.title-right {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.35);
}

.right .log-container {
  position: relative;
  flex: 1;
  overflow-y: auto;
}

.empty-bar {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.empty-bar span {
  margin-top: 10px;
  font-family: Source Han Sans CN;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  /* identical to box height */
  text-align: center;
  color: rgba(0, 0, 0, 0.35);
}
.log-list {
  margin-top: 5px;
}

.log-list .item {
  padding: 5px 0;
  font-family: Source Han Sans CN;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  color: rgba(0, 0, 0, 0.35);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.13);
}

.item .info {
  font-family: Source Han Sans CN;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  /* identical to box height */
  color: rgba(0, 0, 0, 0.82);
  display: flex;

}

.info .orderNo {
  flex: 1;
}

.item .time {
  font-family: Source Han Sans CN;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  /* identical to box height */
  text-align: right;
  color: rgba(0, 0, 0, 0.49);
}


/* 帮助弹窗 */
.dialog_publish_main {
  width: 500px;
  display: flex;
  .main-content {
    flex: 1;
    .item {
      margin-bottom: 20px;
      .item-url {
        margin-top: 5px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        max-width: 300px;
      }
      .item-text {
        margin-top: 5px;
      }
    }
    .close-btn {
      display: flex;
      flex-direction: row-reverse;
      button {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        height: 35px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        padding: 0 20px;
        cursor: pointer;
      }
    } 
  }
}

</style>
