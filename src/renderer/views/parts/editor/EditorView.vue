<template>
  <div class="editor-wrapper">
    <multipanel layout="vertical" >
      <sidebar-view></sidebar-view>
      <multipanel-resizer></multipanel-resizer>
      <monaco-editor class="editor" v-model="code"></monaco-editor>
    </multipanel>
  </div>
</template>

<script>
import MonacoEditor from '@/components/MonacoEditor';
export default {
  name: 'editor-view',
  data() {
    return {
      code: `// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
`
    };
  },
  components: { MonacoEditor }
};
</script>

<style lang="less">
.editor-wrapper {
  position: absolute;
  left: 0;
  width: 100%;
  .editor {
    width: 100%;
    height: 100%;
  }
}
</style>