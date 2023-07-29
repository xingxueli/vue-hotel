<template>
  <el-breadcrumb class="breadcrumb-container" separator=">">
    <el-breadcrumb-item v-for="item in list" :key="item">
      {{ item }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'VabBreadcrumb',
    // // 声明 props，指定要接收的参数名
    // props: {
    //   title: {
    //     type: String,
    //     required: true, // 如果父组件没有传递该参数，则会显示警告
    //   },
    // },
    data() {
      return {
        list: [],
      }
    },
    computed: {
      ...mapGetters({
        menuMap: 'routes/menuMap',
      }),
    },
    watch: {
      $route() {
        // console.log(this.$route)
        this.list = this.getBreadcrumb()
      },
      immediate: true,
    },
    created() {
      this.list = this.getBreadcrumb()
    },
    methods: {
      getBreadcrumb() {
        // let bread = this.$route.matched.filter(
        //   (item) => item.name && item.meta.title
        // )
        // console.log(bread)
        // return bread
        return this.menuMap.get(this.$route.path).catalogList
      },
      getLabel(path) {
        // console.log(this.menuMap)
        return this.menuMap.get(path)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .breadcrumb-container {
    height: $base-nav-bar-height;
    font-size: $base-font-size-default;
    line-height: $base-nav-bar-height;

    ::v-deep {
      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          a {
            display: flex;
            float: left;
            font-weight: normal;
            color: #515a6e;

            i {
              margin-right: 3px;
            }
          }
        }

        &:last-child {
          .el-breadcrumb__inner {
            a {
              color: #999;
            }
          }
        }
      }
    }
  }
</style>
