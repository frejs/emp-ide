<template>
  <div class="wrapper">
    <headerbar-view></headerbar-view>
    <simulator-view></simulator-view>
    <sidebar-view></sidebar-view>
    <editor-view></editor-view>
    <devtools-View></devtools-view>
  </div>
</template>

<script>
import HeaderbarView from './parts/HeaderbarView';
import SimulatorView from './parts/SimulatorView';
import SidebarView from './parts/SidebarView';
import EditorView from './parts/EditorView';
import DevtoolsView from './parts/DevToolsView';

export default {
  name: 'workbench-page',
  components: { HeaderbarView, SimulatorView, SidebarView, EditorView, DevtoolsView },
  mounted() {
    const simulatorView = document.getElementById('simulator');
    const devtoolsView = document.getElementById('devtools');
    simulatorView.addEventListener('dom-ready', () => {
      const simulator = simulatorView.getWebContents();
      simulator.setDevToolsWebContents(devtoolsView.getWebContents());
      simulator.openDevTools();
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
