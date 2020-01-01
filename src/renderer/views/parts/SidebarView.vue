<template>
  <div class="sidebar-wrapper">
    <tree
      class="project-filelist"
      ref="my-tree-ref"
      :custom-options="myCustomOptions"
      :custom-styles="myCustomStyles"
      :nodes="treeDisplayData"
    ></tree>
  </div>
</template>

<script>
import Tree from '@/components/Tree';
const { remote } = require('electron');
const { Menu, MenuItem } = remote;

export default {
  name: 'sidebar-view',
  components: { Tree },
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
  computed: {
    menuItemList() {
      return [
        {
          action: 'NewFile',
          label: '新建文件',
          click: this.addNodeFunction('file')
        },
        {
          action: 'New',
          label: '新建文件夹',
          click: this.addNodeFunction('folder')
        }
      ];
    },
    myCustomStyles() {
      return {
        icon: '+',
        tree: {
          height: 'auto',
          maxHeight: '300px',
          overflowY: 'visible',
          display: 'inline-block'
        },
        row: {
          width: '500px',
          cursor: 'pointer',
          child: {
            height: '35px'
          }
        },
        text: {
          style: {},
          active: {
            style: {
              'font-weight': 'bold',
              color: '#2ECC71'
            }
          }
        }
      };
    },
    myCustomOptions() {
      return {
        treeEvents: {
          expanded: {
            state: false
          },
          collapsed: {
            state: false
          }
        },
        events: {
          editableName: {
            state: true,
            fn: this.expandedNodeFunction,
            calledEvent: 'expanded'
          }
        },
        // addNode: {
        //   state: true,
        //   fn: this.addNodeFunction,
        //   appearOnHover: false
        // },
        // editNode: { state: false, fn: null, appearOnHover: false },
        // deleteNode: {
        //   state: true,
        //   fn: this.deleteNodeFunction,
        //   appearOnHover: true
        // },
        showTags: true
      };
    }
  },
  mounted() {
    window.addEventListener('contextmenu', (e) => {
      if (e.target.className === 'capitalize') {
        e.preventDefault();
        const menu = new Menu();
        this.menuItemList.forEach(menuItem => {
          menu.append(new MenuItem({
            label: menuItem.label,
            click: menuItem.click
          }));
        });
        menu.popup({
          window: remote.getCurrentWindow()
        });
      }
    }, false);
  },
  methods: {
    getTreeVisibleNodes() {
      console.log(`visible nodes: ${this.$refs['my-tree'].getVisibleNodes()}`);
    },
    getTree(treeId) {
      for (let i = 0; i < this.$children.length; i++) {
        if (this.$children[i].$props.id === treeId) return this.$children[i];
      }
    },
    deleteNodeFunction(node) {
      console.log(`must remove ${node.id}`);
    },
    addNodeFunction(node) {
      console.log('add node function');
    },
    expandedNodeFunction(node) {
      console.log('expanded node function');
    }
  }
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