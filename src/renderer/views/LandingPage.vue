<template>
  <div class="wrapper">
    <headerbar-view></headerbar-view>
    <simulator-view></simulator-view>
    <editor-view></editor-view>
    <devtools-View></devtools-view>
  </div>
</template>

<script>
import HeaderbarView from '../components/HeaderbarView';
import SimulatorView from '../components/SimulatorView';
import EditorView from '../components/EditorView';
import DevtoolsView from '../components/DevToolsView';
export default {
  name: 'landing-page',
  components: { HeaderbarView, SimulatorView, EditorView, DevtoolsView },
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
}
</style>
