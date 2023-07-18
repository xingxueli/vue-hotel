<template>
  <div>Hello + {{ menuId }}</div>
</template>

<script>
  import { getList, doDelete, doCreate, doShelves } from '@/api/treeDemo'
  // import TreeNodeDialog from '@/views/index/TreeNodeDialog'
  let idGlobal = 1000

  export default {
    mounted() {
      const keyword = this.$route.query.keyword // 获取查询参数
      console.log(keyword) // 输出传递给路由的查询参数的值
    },
  }
</script>
