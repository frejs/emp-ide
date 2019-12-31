<template>
  <div class="wrapper">
   <headerbar-view></headerbar-view>
   <webview class="simulator" id="browser" src="https://zhaomenghuan.js.org"></webview>
   <webview class="devtools" id="devtools"></webview>
  </div>
</template>

<script>
import HeaderbarView from '../components/HeaderbarView';
export default {
  name: 'landing-page',
  components: { HeaderbarView },
  mounted() {
    const browserView = document.getElementById('browser');
    const devtoolsView = document.getElementById('devtools');
    browserView.addEventListener('dom-ready', () => {
      const browser = browserView.getWebContents();
      browser.setDevToolsWebContents(devtoolsView.getWebContents());
      browser.openDevTools();
    });
  }
};
</script>

<style lang="less">
.wrapper {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #EDECE8;
  .simulator {
    position: absolute;
    top: 100px;
    bottom: 0;
    left: 0;
    width: 400px;
  }
  .devtools {
    position: absolute;
    top: 100px;
    right: 0;
    bottom: 0;
    left: 400px;
  }
}
</style>
