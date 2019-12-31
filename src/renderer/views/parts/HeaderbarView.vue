<template>
  <div class="header-wrapper">
    <div class="user-info">
      <img class="avatar" src="https://zhaomenghuan.js.org/avatar.png" alt />
    </div>
    <div class="action-item-list">
      <div class="action-item" v-for="(action) in actionList" :key="action.id">
        <div class="icon">
          <img :src="action.icon" />
        </div>
        <h5>{{action.label}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actionList: [
        {
          id: 'simulator',
          label: '模拟器',
          icon: require('@/assets/icons/simulator.svg')
        },
        {
          id: 'preview',
          label: '预览',
          icon: require('@/assets/icons/preview.svg')
        }
      ]
    };
  }
};
</script>

<style lang="less">
.header-wrapper {
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
      margin: 15px;
    }
  }
  .action-item-list {
    display: flex;
    height: 60px;
    margin: 5px 15px;
    .action-item {
      flex: 1;
      width: 60px;
      height: 60px;
      .icon {
        width: 40px;
        margin: 10px auto 5px;
        padding: 5px;
        background-color: #fff;
        border-radius: 5px;
        img {
          display: block;
          width: 15px;
          height: 15px;
          margin: 0 auto;
        }
      }
      h5 {
        margin: 0;
        padding: 0;
        font-size: 12px;
        font-weight: 600;
        line-height: 15px;
        text-align: center;
        color: #fff;
      }
    }
  }
}
</style>