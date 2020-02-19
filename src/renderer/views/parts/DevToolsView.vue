<template>
  <div class="devtools-wrapper" ref="devtoolsWrapper">
    <div class="tabbar">调试器</div>
    <webview class="devtools" id="devtools"></webview>
  </div>
</template>

<script>
export default {
  name: 'devtools-view'
};
</script>

<style lang="less">
.devtools-wrapper {
  height: 300px;
  .tabbar {
    height: 30px;
    padding-left: 5px;
    font-size: 12px;
    line-height: 30px;
    color: hsla(0,0%,100%,.65);
    background-color: #30303D;
  }
  .devtools {
    width: 100%;
    height: 270px;
  }
}
</style>