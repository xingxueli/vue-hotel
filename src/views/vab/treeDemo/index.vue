<template>
  <div class="tree-container">
    <!-- 级联选择静态树 -->
    <el-tree
      :data="treeData"
      :props="props"
      node-key="id"
      :expand-on-click-node="false"
      :render-content="renderContent"
    />
    <div style="margin-left: 20px">
      <el-button
        style="padding-bottom: 0"
        icon="el-icon-circle-plus-outline"
        type="text"
        @click="addTreeItem"
      >
        添加父级
      </el-button>
    </div>
    <el-divider />
  </div>
</template>

<script>
  import { getList, doDelete, doCreate, doShelves } from '@/api/treeDemo'
  // import TreeNodeDialog from '@/views/index/TreeNodeDialog'
  import { getIdGlobal } from '@/utils/db'
  const idGlobal = getIdGlobal()

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
      renderContent(h, { node, data, store }) {
        return (
          <div class="custom-tree-node">
            <span>{node.label}</span>
            <span class="node-operation">
              <i
                on-click={() => this.append(data)}
                class="el-icon-plus"
                title="添加"
              ></i>
              <i
                on-click={() => this.remove(node, data)}
                class="el-icon-delete"
                title="删除"
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
      addTreeItem() {
        ++this.idGlobal
        this.dialogVisible = true
        this.currentNode = this.activeData.options
      },
      append(data) {
        console.log(data)
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        this.dialogVisible = true
        this.currentNode = data.children
      },
      remove(node, data) {
        const { parent } = node
        const children = parent.data.children || parent.data
        const index = children.findIndex((d) => d.id === data.id)
        children.splice(index, 1)
      },
    },
  }
</script>
