<template>
  <div class="landing-wrapper">
    <div class="sidebar">
      <div class="app-info">
        <img class="logo" :src="appInfo.icon" alt />
        <h3 class="name">{{appInfo.name}}</h3>
        <h5 class="version">{{appInfo.version}}</h5>
      </div>
      <div class="action-btns">
        <button type="button"
          v-for="(projectType, index) in projectTypeList"
          :key="projectType.name"
          :class="{ active: index === currentProjectTypeIndex }"
          @click="currentProjectTypeIndex = index">{{projectType.label}}</button>
      </div>
    </div>
    <div class="content">
      <h1 class="title">{{projectTypeList[currentProjectTypeIndex].label}}</h1>
      <p class="description">{{projectTypeList[currentProjectTypeIndex].description}}</p>
      <div class="next-action-btns">
        <div class="btn" @click="openWorkbenchPage">
          <img class="icon" src="~@/assets/icons/plus.svg" alt="" srcset="">
          <span>新建</span>
        </div>
        <div class="btn" @click="openWorkbenchPage">
          <img class="icon" src="~@/assets/icons/folder.svg" alt="" srcset="">
          <span>打开</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron');
const { dialog } = require('electron').remote;

export default {
  name: 'landing-page',
  components: {},
  data() {
    return {
      appInfo: {
        icon: 'https://aemp.js.org/logo.png',
        name: '开发者工具',
        version: 'v0.0.1'
      },
      projectTypeList: [
        {
          name: 'miniprogram',
          label: '小程序',
          description: '小程序是移动生态下全新的产品形态，可被高效的检索和分发，为用户提供更加优质的使用体验。'
        },
        {
          name: 'code',
          label: '代码片段',
          description: '代码片段是一种可分享的小项目，可用于分享开发经验、展示组件和 API 的使用等。'
        }
      ],
      currentProjectTypeIndex: 0
    };
  },
  mounted() {
    ipcRenderer.send('window-max');
    this.$router.push({
      name: 'workbench-page'
    });
  },
  methods: {
    openWorkbenchPage() {
      dialog.showOpenDialog({
        properties: ['openDirectory']
      }, (files) => {
        if (files) {
          ipcRenderer.send('window-max');
          this.$router.push({
            name: 'workbench-page',
            query: {
              files
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.landing-wrapper {
  display: flex;
  flex-direction: row;
  width: 800px;
  height: 500px;
  margin: 0;
  padding: 0;
  .sidebar {
    width: 200px;
    height: 500px;
    text-align: center;
    color: #fff;
    background: linear-gradient(to bottom right, #5ca589 0, #63ca49);
    .app-info {
      .logo {
        display: block;
        width: 50px;
        height: 50px;
        margin: 50px auto 20px;
      }
      .name {
        font-size: 20px;
        font-weight: normal;
      }
    }
    .action-btns {
      width: 200px;
      margin-top: 30px;
      button {
        width: 160px;
        height: 40px;
        font-size: 15px;
        color: #fff;
        border: none;
        background: none;
        outline: none;
        &.active {
          background-color: #0F5A15;
        }
      }
    }
  }
  .content {
    .title {
      font-weight: normal;
      font-size: 25px;
      margin: 15px 30px;
    }
    .description {
      margin: 0 30px;
      font-size: 13px;
      color: #717171;
    }
    .next-action-btns {
      display: flex;
      margin: 20px;
      .btn {
        width: 160px;
        height: 250px;
        margin: 10px;
        text-align: center;
        line-height: 250px;
        color: #1E1E1E;
        background-color: #F9F9F9;
        border-radius: 10px;
        cursor: pointer;
        .icon {
          width: 14px;
          vertical-align: middle;
        }
        span {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
