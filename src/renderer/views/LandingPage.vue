<template>
  <div class="wrapper">
    <button @click="openWorkbenchPage">打开 Workbench</button>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron');

export default {
  name: 'landing-page',
  components: {},
  mounted() {
  },
  methods: {
    openWorkbenchPage() {
      ipcRenderer.send('window-max');
      this.$router.push('/workbench');
    }
  }
};
</script>

<style lang="less">
.wrapper {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #edece8;
}
</style>
