<template>
  <div class="tree-container">
    <!-- 级联选择静态树 -->
    <el-tree
      :data="treeData"
      draggable
      :props="props"
      node-key="id"
      :expand-on-click-node="false"
      :render-content="renderContent"
      @node-click="handleNodeClick"
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
    <el-divider />
    <!-- <treeNode-dialog :visible.sync="dialogVisible" title="添加选项" @commit="addNode" /> -->
  </div>
</template>

<script>
  import { getList, doDelete, doCreate, doShelves } from '@/api/treeDemo'
  // import TreeNodeDialog from '@/views/index/TreeNodeDialog'
  let idGlobal = 1000

  export default {
    // components: {
    //   TreeNodeDialog
    // },
    data() {
      return {
        dialogVisible: false,
        treeData: [],
        listLoading: true,
        props: {
          label: 'name',
          children: 'childMenu',
          isLeaf: 'leaf',
        },
        projectId: 0,
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },
    created() {
      this.fetchData()
    },
    beforeDestroy() {},
    mounted() {},
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
            <el-input
              onInput={($event) => (data.name = $event)}
              v-show={data.edit}
              type="text"
              value={data.name}
              on-blur={(ev) => this.edit_sure(ev, data)}
            />
            <span v-show={!data.edit}>{data.name}</span>
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
      async fetchData() {
        this.listLoading = true
        const { result } = await getList(this.projectId)
        this.treeData = result
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      async addTreeItem() {
        ++idGlobal
        console.log(idGlobal)
        // this.dialogVisible = true
        this.currentNode = this.activeData.options
      },
      async append(parentNode) {
        try {
          const newChild = {
            parentId: parentNode.id,
            name: 'testtest',
            children: [],
            projectId: parentNode.projectId,
          }
          console.log(parentNode)
          const { result } = await doCreate(newChild)
          // 在指定节点下查找新节点应该插入的位置
          if (!parentNode.childMenu) {
            this.$set(parentNode, 'childMenu', [])
          }
          const index = parentNode.childMenu.findIndex(
            (node) => node.id === result.parentId
          )
          if (index !== -1) {
            parentNode.childMenu.splice(index + 1, 0, result) // 将新节点插入到指定位置
          } else {
            parentNode.childMenu.push(result) // 如果无法找到指定位置，则将新节点添加到末尾
          }

          this.newNodeName = '' // 清空输入框
        } catch (error) {
          console.error('Failed to add node:', error)
        }
      },
      edit(ev, node, data) {
        data.edit = true
        this.$nextTick(() => {
          console.log(ev.target)
          console.log(ev.target.parentElement)
          console.log(ev.target.parentElement.parentElement)
          const $input =
            ev.target.parentNode.parentNode.querySelector('input') ||
            ev.target.parentElement.parentElement.querySelector('input')
          !$input ? '' : $input.focus()
        })
      },
      remove(node, data) {
        const { parent } = node
        const children = parent.data.children || parent.data
        const index = children.findIndex((d) => d.id === data.id)
        children.splice(index, 1)
      },
      edit_sure(ev, data) {
        const $input =
          ev.target.parentNode.parentNode.querySelector('input') ||
          ev.target.parentElement.parentElement.querySelector('input')

        if (!$input) {
          return false
        } else {
          data.name = $input.value
          data.edit = false
        }
      },
      handleNodeClick(node) {
        // 获取点击的节点的 route 值
        const route = {}
        route.path = ''
        route.query = { id: node.id }
        // 使用 Vue Router 跳转路由
        this.$router.push(route)
      },
    },
  }
</script>
