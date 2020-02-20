<template>
  <div class="wrapper">
    <headerbar-view></headerbar-view>
    <multipanel layout="vertical" class="ide-layout" @paneResize="ideLayoutPaneresize">
      <simulator-view @selected="onMobileSimulatorSelected"></simulator-view>
      <multipanel-resizer></multipanel-resizer>
      <div class="ide-layout-main" :style="{
        left: `${ ideLayoutMainLeftParam }px`
      }">
        <multipanel layout="vertical" class="ide-layout-panel-editor">
          <sidebar-view></sidebar-view>
          <multipanel-resizer></multipanel-resizer>
          <editor-view></editor-view>
        </multipanel>
        <div class="ide-layout-panel-devtools">
          <devtools-view></devtools-view>
        </div>
      </div>
    </multipanel>
  </div>
</template>

<script>
import { Multipanel, MultipanelResizer } from '@/components/multipanel';
import HeaderbarView from './parts/HeaderbarView';
import SimulatorView from './parts/SimulatorView';
import SidebarView from './parts/SidebarView';
import EditorView from './parts/EditorView';
import DevtoolsView from './parts/DevToolsView';
import { connectSimulatorDevTools } from '../utils/devtools';

export default {
  name: 'workbench-page',
  data() {
    return {
      simulatorPanel: {
        minWidth: 0,
        width: 0
      }
    };
  },
  components: {
    Multipanel,
    MultipanelResizer,
    HeaderbarView,
    SimulatorView,
    SidebarView,
    EditorView,
    DevtoolsView
  },
  mounted() {
    const simulatorView = document.getElementById('simulator');
    const devtoolsView = document.getElementById('devtools');
    connectSimulatorDevTools(simulatorView, devtoolsView);
  },
  computed: {
    ideLayoutMainLeftParam() {
      const minWidth = this.simulatorPanel.minWidth;
      const width = this.simulatorPanel.width;
      return width >= minWidth ? width : minWidth;
    }
  },
  methods: {
    ideLayoutPaneresize(pane, resizer, size) {
      this.simulatorPanel.width = Number(size.replace('px', ''));
    },
    onMobileSimulatorSelected({ width }) {
      this.simulatorPanel.minWidth = width;
      this.simulatorPanel.width = width;
    }
  }
};
</script>

<style lang="less">
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .ide-layout {
    position: absolute;
    top: 71px;
    bottom: 0;
    left: 0;
    width: 100%;
    .ide-layout-main {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
    }
    .ide-layout-panel-editor {
      position: absolute;
      top: 0;
      bottom: 300px;
      width: 100%;
    }
    .ide-layout-panel-devtools {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 300px;
    }
  }
}
</style>
