<template>
  <div class="devtools-wrapper">
    <webview class="devtools" id="devtools"></webview>
  </div>
</template>

<script>
// const path = require('path');
export default {
  name: 'devtools-view',
  mounted() {
    // const devtoolsView = document.getElementById('devtools');
    // devtoolsView.addEventListener('dom-ready', () => {
    //   const rootDir = process.cwd();
    //   devtoolsView.getWebContents().addDevToolsExtension(path.join(rootDir, 'src/plugins/ext-test'));
    // });
  }
};
</script>

<style lang="less">
.devtools-wrapper {
  position: absolute;
  left: 400px;
  right: 0;
  bottom: 0;
  height: 300px;
  .devtools {
    width: 100%;
    height: 100%;
  }
}
</style>