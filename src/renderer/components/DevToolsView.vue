<template>
  <div class="devtools-wrapper">
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