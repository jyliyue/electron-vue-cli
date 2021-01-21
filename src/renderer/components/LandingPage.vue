<template>
  <div id="wrapper">
    <main>
      123
    </main>
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    data() {
      return {

      }
    },
    created() {
      this.init()
    },
    mounted() {

    },
    methods: {
      init() {

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
