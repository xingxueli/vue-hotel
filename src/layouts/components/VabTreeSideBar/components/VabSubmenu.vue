<template>
  <el-submenu
    ref="subMenu"
    :index="handlePath(item.path)"
    :popper-append-to-body="false"
  >
    <!-- @click.native="handleLink" -->
    <template slot="title">
      <vab-icon
        v-if="item.meta && item.meta.icon"
        :icon="['fas', item.meta.icon]"
        class="vab-fas-icon"
      />
      <vab-remix-icon
        v-if="item.meta && item.meta.remixIcon"
        :icon-class="item.meta.remixIcon"
        class="vab-remix-icon"
      />
      <span>{{ item.meta.title }}</span>
    </template>
    <slot />
  </el-submenu>
</template>

<script>
  import { isExternal } from '@/utils/validate'
  import path from 'path'

  export default {
    name: 'VabSubmenu',
    props: {
      routeChildren: {
        type: Object,
        default() {
          return null
        },
      },
      item: {
        type: Object,
        default() {
          return null
        },
      },
      fullPath: {
        type: String,
        default: '',
      },
    },
    methods: {
      handlePath(routePath) {
        // console.log(routePath)
        if (isExternal(routePath)) {
          return routePath
        }
        if (isExternal(this.fullPath)) {
          return this.fullPath
        }
        return path.resolve(this.fullPath, routePath)
      },
      // handleLink() {
      //   const routePath = this.routeChildren.path
      //   const target = this.routeChildren.meta.target

      //   if (target === '_blank') {
      //     if (isExternal(routePath)) {
      //       window.open(routePath)
      //     } else if (isExternal(this.fullPath)) {
      //       window.open(this.fullPath)
      //     } else if (
      //       this.$route.path !== path.resolve(this.fullPath, routePath)
      //     ) {
      //       let routeData = this.$router.resolve(
      //         path.resolve(this.fullPath, routePath)
      //       )
      //       window.open(routeData.href)
      //     }
      //   } else {
      //     if (isExternal(routePath)) {
      //       window.location.href = routePath
      //     } else if (isExternal(this.fullPath)) {
      //       window.location.href = this.fullPath
      //     } else if (
      //       this.$route.path !== path.resolve(this.fullPath, routePath)
      //     ) {
      //       console.log(path.resolve(this.fullPath, routePath))
      //       this.$router.push(path.resolve(this.fullPath, routePath))
      //     }
      //   }
      // },
    },
  }
</script>
