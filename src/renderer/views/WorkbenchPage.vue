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
    const port = process.env.EMP_REMOTE_DEBUGGING_PORT;
    const baseUrl = `http://127.0.0.1:${port}`;
    simulatorView.addEventListener('dom-ready', () => {
      fetch(`${baseUrl}/json`)
        .then(res => res.json())
        .then(res => {
          const target = res.find(child => child.type === 'webview' && child.url === simulatorView.src);
          if (target) {
            devtoolsView.setAttribute('src', `${baseUrl}${target.devtoolsFrontendUrl}`);
            const simulatorContents = simulatorView.getWebContents();
            const devtoolsContents = devtoolsView.getWebContents();
            simulatorContents.setDevToolsWebContents(devtoolsContents);
            simulatorContents.openDevTools({
              mode: 'detach'
            });
          }
        });
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
