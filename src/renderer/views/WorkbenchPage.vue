<template>
  <div class="wrapper">
    <toolbar-view></toolbar-view>
    <multipanel layout="vertical" class="ide-layout" @paneResize="ideLayoutPaneresize">
      <simulator-view @selected="onMobileSimulatorSelected"></simulator-view>
      <multipanel-resizer></multipanel-resizer>
      <div class="ide-layout-main" :style="{
        left: `${ ideLayoutMainLeftParam }px`
      }">
        <div class="ide-layout-panel-devtools">
          <div class="tabbar">调试器</div>
        </div>
      </div>
    </multipanel>
  </div>
</template>

<script>
import { Multipanel, MultipanelResizer } from '@/components/multipanel';
import ToolbarView from './parts/ToolbarView';
import SimulatorView from './parts/SimulatorView';
const ipcRenderer = require('electron').ipcRenderer;

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
    ToolbarView,
    SimulatorView
  },
  mounted() {
    const simulatorView = document.getElementById('simulator');
    simulatorView.addEventListener('dom-ready', () => {
      ipcRenderer.send('initialized', {
        url: simulatorView.src
      });
    });
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
    .ide-layout-panel-devtools {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      .tabbar {
        height: 30px;
        padding-left: 5px;
        font-size: 12px;
        line-height: 30px;
        color: hsla(0, 0%, 100%, 0.65);
        background-color: #30303d;
      }
    }
  }
}
</style>
