<template>
  <div class="wrapper">
    <headerbar-view></headerbar-view>
    <simulator-view></simulator-view>
    <webview class="devtools" id="devtools"></webview>
  </div>
</template>

<script>
import HeaderbarView from '../components/HeaderbarView';
import SimulatorView from '../components/SimulatorView';
export default {
  name: 'landing-page',
  components: { HeaderbarView, SimulatorView },
  mounted() {
    const simulatorView = document.getElementById('simulator');
    const devtoolsView = document.getElementById('devtools');
    simulatorView.addEventListener('dom-ready', () => {
      const browser = simulatorView.getWebContents();
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
  background-color: #edece8;
  .devtools {
    position: absolute;
    top: 70px;
    right: 0;
    bottom: 0;
    left: 400px;
  }
}
</style>
