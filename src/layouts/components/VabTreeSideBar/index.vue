<template>
  <el-scrollbar class="side-bar-container">
    <vab-logo :title="projectName" />
    <div class="tree-container">
      <!-- 级联选择静态树 -->
      <el-tree
        :data="menuList[0].children"
        draggable
        :props="props"
        node-key="id"
        :expand-on-click-node="false"
        :render-content="renderContent"
        @node-click="handleLink"
      />
      <!-- <div style="margin-left: 20px">
        <el-button
          style="padding-bottom: 0"
          icon="el-icon-circle-plus-outline"
          type="text"
          @click="addTreeItem"
        >
          添加父级
        </el-button>
      </div> -->
      <!-- <el-divider /> -->
      <!-- <treeNode-dialog :visible.sync="dialogVisible" title="添加选项" @commit="addNode" /> -->
    </div>
  </el-scrollbar>
</template>
<script>
  import variables from '@/styles/variables.scss'
  import { mapGetters } from 'vuex'
  import { isExternal } from '@/utils/validate'
  import path from 'path'
  import { menuCreate } from '@/api/menu'

  export default {
    name: 'VabTreeSideBar',
    data() {
      return {
        projectName: 'mvdklsmakfds',
        props: {
          label: 'name',
          isLeaf: 'leaf',
        },
      }
    },
    computed: {
      ...mapGetters({
        menuList: 'routes/menuList',
      }),
      variables() {
        return variables
      },
    },
    methods: {
      //       <i
      //   on-click={(ev) => this.edit(ev, node, data)}
      //   class="el-icon-edit"
      //   title="编辑"
      // ></i>
      // <i
      //   on-click={() => this.remove(node, data)}
      //   class="el-icon-delete"
      //   title="删除"
      // ></i>
      renderContent(h, { node, data, store }) {
        return (
          <div class="custom-tree-node">
            <span>{data.name}</span>
            <span class="node-operation">
              <i
                on-click={() => this.append(data)}
                class="el-icon-plus"
                title="添加"
              ></i>
            </span>
          </div>
        )
      },
      // async fetchData() {
      //   this.listLoading = true
      //   const { data } = await getList(this.projectId)
      //   this.treeData = data
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 500)
      // },
      // async addTreeItem() {
      //   ++idGlobal
      //   console.log(idGlobal)
      //   // this.dialogVisible = true
      //   this.currentNode = this.activeData.options
      // },
      async append(parentNode) {
        try {
          const newChild = {
            parentId: parentNode.id,
            name: 'testtest',
            children: [],
            projectId: parentNode.projectId,
          }
          console.log(parentNode)
          const { data } = await menuCreate(newChild)
          // 在指定节点下查找新节点应该插入的位置
          if (!parentNode.children) {
            this.$set(parentNode, 'children', [])
          }
          const index = parentNode.children.findIndex(
            (node) => node.id === data.parentId
          )
          if (index !== -1) {
            parentNode.children.splice(index + 1, 0, data) // 将新节点插入到指定位置
          } else {
            parentNode.children.push(data) // 如果无法找到指定位置，则将新节点添加到末尾
          }

          this.newNodeName = '' // 清空输入框
        } catch (error) {
          console.error('Failed to add node:', error)
        }
      },
      // edit(ev, node, data) {
      //   data.edit = true
      //   this.$nextTick(() => {
      //     console.log(ev.target)
      //     console.log(ev.target.parentElement)
      //     console.log(ev.target.parentElement.parentElement)
      //     const $input =
      //       ev.target.parentNode.parentNode.querySelector('input') ||
      //       ev.target.parentElement.parentElement.querySelector('input')
      //     !$input ? '' : $input.focus()
      //   })
      // },
      // remove(node, data) {
      //   const { parent } = node
      //   const children = parent.data.children || parent.data
      //   const index = children.findIndex((d) => d.id === data.id)
      //   children.splice(index, 1)
      // },
      // edit_sure(ev, data) {
      //   const $input =
      //     ev.target.parentNode.parentNode.querySelector('input') ||
      //     ev.target.parentElement.parentElement.querySelector('input')

      //   if (!$input) {
      //     return false
      //   } else {
      //     data.name = $input.value
      //     data.edit = false
      //   }
      // },
      handleNodeClick(node) {
        // 获取点击的节点的 route 值
        console.log(node)
        const route = {}
        // vviews -> /vab/vviews
        route.path = this.handlePath(node.path)
        // route.component = () => import('@/views/vab/variableViews/index')
        route.meta = { menuId: node.id }
        // 使用 Vue Router 跳转路由
        this.$router.push(route)
      },
      handlePath(routePath) {
        if (isExternal(routePath)) {
          return routePath
        }
        if (isExternal(this.fullPath)) {
          return this.fullPath
        }
        return path.resolve(this.fullPath, routePath)
      },
      handleLink(node) {
        const routePath = node.path

        // console.log(routePath)
        // console.log(this.fullPath)
        // console.log(isExternal(this.fullPath))
        // console.log(this.$route.path !== path.resolve(this.fullPath, routePath))

        if (isExternal(routePath)) {
          window.location.href = routePath
        } else if (isExternal(this.fullPath)) {
          window.location.href = this.fullPath
        } else if (
          this.$route.path !== path.resolve(this.fullPath, routePath)
        ) {
          // console.log(path.resolve(this.fullPath, routePath))
          this.$router.push(path.resolve(this.fullPath, routePath))
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  @mixin active {
    &:hover {
      color: $base-color-white;
      background-color: $base-menu-background-active !important;
    }

    &.is-active {
      color: $base-color-white;
      background-color: $base-menu-background-active !important;
    }
  }

  .side-bar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: $base-z-index;
    width: $base-left-menu-width;
    height: 100vh;
    overflow: hidden;
    background: $base-menu-background;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    transition: width $base-transition-time;

    &.is-collapse {
      width: $base-left-menu-width-min;
      border-right: 0;

      ::v-deep {
        .el-menu {
          transition: width $base-transition-time;
        }

        .el-menu--collapse {
          border-right: 0;

          .el-submenu__icon-arrow {
            right: 10px;
            margin-top: -3px;
          }
        }
      }
    }

    ::v-deep {
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }

      .el-menu {
        border: 0;

        .vab-fas-icon {
          padding-right: 3px;
          font-size: $base-font-size-default;
        }

        .vab-remix-icon {
          padding-right: 3px;
          font-size: $base-font-size-default + 2;
        }
      }

      .el-menu-item,
      .el-submenu__title {
        height: $base-menu-item-height;
        overflow: hidden;
        line-height: $base-menu-item-height;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }

      .el-menu-item {
        @include active;
      }
    }
  }
</style>
