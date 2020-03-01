<template>
  <div class="toobar-wrapper">
    <div class="user-info">
      <img class="avatar" src="https://zhaomenghuan.js.org/avatar.png" alt />
    </div>
    <div class="listview">
      <div class="list-item" :class="{ active: layout.isShow }" v-for="(layout) in layoutList" :key="layout.id" @click="toogleLayoutPanel(layout)">
        <div class="btn">
          <img class="icon" :src="layout.isShow ? layout.activeIcon : layout.icon" alt="" />
        </div>
        <span class="label">{{layout.label}}</span>
      </div>
    </div>
    <div class="listview">
      <div class="list-item" v-for="(action) in actionList" :key="action.id" @click="handleActionButtonClick(action.id)">
        <div class="btn">
          <img class="icon" :src="action.icon" alt="" />
        </div>
        <span class="label">{{action.label}}</span>
      </div>
    </div>
  </div>
</template>

<script>
const path = require('path');
const BrowserWindow = require('electron').remote.BrowserWindow;

export default {
  data() {
    return {
      layoutList: [
        {
          id: 'simulator',
          label: '模拟器',
          icon: require('@/assets/icons/simulator.svg'),
          activeIcon: require('@/assets/icons/simulator-active.svg'),
          isShow: true
        },
        {
          id: 'editor',
          label: '编辑器',
          icon: require('@/assets/icons/editor.svg'),
          activeIcon: require('@/assets/icons/editor-active.svg'),
          isShow: true
        },
        {
          id: 'devtools',
          label: '调试器',
          icon: require('@/assets/icons/devtools.svg'),
          activeIcon: require('@/assets/icons/devtools-active.svg'),
          isShow: true
        }
      ],
      actionList: [
        {
          id: 'preview',
          label: '预览',
          icon: require('@/assets/icons/preview.svg')
        },
        {
          id: 'remote-debug',
          label: '远程调试',
          icon: require('@/assets/icons/remote-debug.svg')
        }
      ]
    };
  },
  methods: {
    toogleLayoutPanel(item) {
      item.isShow = !item.isShow;
    },
    handleActionButtonClick(actionId) {
      switch (actionId) {
        case 'remote-debug':
          this.handleRemoteDebug();
          break;
        default:
          break;
      }
    },
    handleRemoteDebug() {
      const remoteDebugPage = path.join('file://', __static, 'remote-debug.html');
      let remoteDebugWindow = new BrowserWindow();
      remoteDebugWindow.maximize();
      remoteDebugWindow.loadURL(remoteDebugPage);
      remoteDebugWindow.show();
      remoteDebugWindow.webContents.openDevTools({
        mode: 'right'
      });
    }
  }
};
</script>

<style lang="less">
.toobar-wrapper {
  width: 100%;
  height: 70px;
  font-size: 30px;
  line-height: 70px;
  display: flex;
  justify-content: space-between;
  background-color: #282c35;
  box-shadow: 0 0 0 1px #000;
  .user-info {
    .avatar {
      display: inline-block;
      width: 40px;
      height: 40px;
      margin: 20px;
    }
  }
  .listview {
    display: flex;
    height: 50px;
    margin: 10px;
    .list-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 60px;
      text-align: center;
      cursor: pointer;
      user-select: none;
      .btn {
        width: 40px;
        margin: 5px auto;
        padding: 5px;
        background-color: #fff;
        border-radius: 5px;
        .icon {
          display: block;
          height: 15px;
          margin: 0 auto;
        }
      }
      .label {
        margin: 0;
        padding: 0;
        font-size: 12px;
        font-weight: 600;
        line-height: 15px;
        text-align: center;
        color: #fff;
      }
      &.active {
        .btn {
          background-color: #38f;
        }
      }
    }
  }
}
</style>