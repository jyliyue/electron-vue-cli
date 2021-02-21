<template>
  <div id="wrapper">
    <main>
      <div class="container">
        <img src="../assets/logo.png" alt="">
      </div>
      <update-handle :show.sync="showUpdate" :percent="percent"></update-handle>
    </main>
  </div>
</template>

<script>
  import updateHandle from '../components/update-handle'
  export default {
    components: {
      updateHandle
    },
    data() {
      return {
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
  img {
    height: 150px;
  }
}
</style>
