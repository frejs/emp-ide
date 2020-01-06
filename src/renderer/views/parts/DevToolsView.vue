<template>
  <div class="devtools-wrapper" ref="devtoolsWrapper">
    <webview class="devtools" id="devtools" preload="file:///Users/zhaomenghuan/research/miniprogram/emp-ide/src/renderer/views/parts/devtools-preload.js"></webview>
  </div>
</template>

<script>
export default {
  name: 'devtools-view'
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