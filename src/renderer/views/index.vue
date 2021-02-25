<template>
  <div id="wrapper">
    <main>
      <div class="container">
        <h1>
          <img src="../assets/logo.png" alt="">
        </h1>
        <h2>version: {{ config.version }}</h2>
      </div>
      <update-handle :show.sync="showUpdate" :percent="percent"></update-handle>
    </main>
  </div>
</template>

<script>
  import updateHandle from '../components/update-handle'
  import config from '../../config'
  export default {
    components: {
      updateHandle
    },
    data() {
      return {
        config: config,
        showUpdate: false,
        percent: 0
      }
    },
    created() {
      this.init()
    },
    mounted() {

    },
    methods: {
      init() {
        this.checkUpdate()
      },
      checkUpdate() {
        this.$electron.ipcRenderer.send("checkForUpdate")
      }
    }
  }
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    height: 150px;
  }
}
</style>
