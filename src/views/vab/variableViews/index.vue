<template>
  <div>Hello + {{ pageId }}</div>
</template>

<script>
  export default {
    data() {
      return {
        pageId: '1',
      }
    },
    mounted() {
      const pageId = this.$route.params.pageId // 获取查询参数
      this.pageId = pageId
      // console.log(pageId) // 输出传递给路由的查询参数的值
    },
  }
</script>
