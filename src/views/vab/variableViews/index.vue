<template>
  <div>Hello + {{ menuId }}</div>
</template>

<script>
  export default {
    data() {
      return {
        menuId: '1',
      }
    },
    mounted() {
      const menuId = this.$route.meta.menuId // 获取查询参数
      this.menuId = menuId
      console.log(menuId) // 输出传递给路由的查询参数的值
    },
  }
</script>
