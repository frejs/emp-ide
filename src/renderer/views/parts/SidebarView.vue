<template>
  <div class="sidebar-wrapper">
    <tree class="project-filelist" ref="my-tree-ref" :nodes="treeDisplayData"></tree>
  </div>
</template>

<script>
import Tree from '@/components/Tree';
export default {
  name: 'sidebar-view',
  data() {
    return {
      treeDisplayData: [
        {
          text: 'Root 1',
          nodes: [
            {
              text: 'Child 1',
              nodes: [
                {
                  text: 'Grandchild 1'
                },
                {
                  text: 'Grandchild 2'
                }
              ]
            },
            {
              text: 'Child 2'
            }
          ]
        },
        {
          text: 'Root 2'
        }
      ]
    };
  },
  components: { Tree }
};
</script>

<style lang="less">
.sidebar-wrapper {
  position: absolute;
  left: 400px;
  top: 71px;
  bottom: 300px;
  width: 250px;
  background-color: #23242f;
  .project-filelist {
    color: #fff;
  }
}
</style>