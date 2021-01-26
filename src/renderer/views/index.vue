<template>
  <div id="wrapper">
    <main>
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

</style>
