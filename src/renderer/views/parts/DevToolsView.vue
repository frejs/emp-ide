<template>
  <div class="devtools-wrapper" ref="devtoolsWrapper">
    <div class="tabbar">调试器</div>
    <webview class="devtools" 
      id="devtools"
      disablewebsecurity="true"
      enableremotemodule="true"
      plugins>
    </webview>
  </div>
</template>

<script>
export default {
  name: 'devtools-view'
};
</script>

<style lang="less">
.devtools-wrapper {
  height: 100%;
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
    position: absolute;
    top: 30px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>