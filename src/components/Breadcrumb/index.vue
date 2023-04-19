<!--
 * @FilePath: \vue-typescript-admin-template\src\components\Breadcrumb\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 16:49:41
 * @Reference: 引用方 src\layout\index.vue
 * @Descripttion: 说明 框架-头部导航栏-面包屑导航
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <!--面包屑缓动动画-->
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <!--如果是无链接或最后一个则标题是普通文本,否则显示链接文本-->
        <span
          v-if="
            item.redirect === 'noredirect' || index === breadcrumbs.length - 1
          "
          class="no-redirect"
          >{{ $t('route.' + item.meta.title) }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{
          $t('route.' + item.meta.title)
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
// compile(path)(params)作用：快速填充动态路径路由 url 字符串的参数值。
import { compile } from 'path-to-regexp'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { RouteRecord, Route } from 'vue-router'

@Component({
  name: 'Breadcrumb'
})
export default class extends Vue {
  // 路由面包屑列表
  public breadcrumbs: RouteRecord[] = []

  @Watch('$route')
  private onRouteChange(route: Route) {
    // 如果路由转接跳转则返回
    if (route.path.startsWith('/redirect/')) {
      return
    }
    this.getBreadcrumb()
  }

  // 初始化
  created() {
    this.getBreadcrumb()
  }

  // 获取当前的面包屑路由列表
  public getBreadcrumb() {
    let matched = this.$route.matched.filter(
      (item) => item.meta && item.meta.title
    )
    const first = matched[0]
    if (!this.isDashboard(first)) {
      matched = [
        {
          path: '/dashboard',
          meta: { title: 'dashboard' }
        } as unknown as RouteRecord
      ].concat(matched)
    }
    this.breadcrumbs = matched.filter((item) => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false
    })
  }

  // 是否首页
  public isDashboard(route: RouteRecord) {
    const name = route && route.name
    if (!name) {
      return false
    }
    return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
  }

  // compile(path)(params)作用：快速填充 url 字符串的参数值。
  public pathCompile(path: string) {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const { params } = this.$route
    const toPath = compile(path)
    return toPath(params)
  }

  // 激活当前导航链接
  public handleLink(item: any) {
    // 如果有直跳链接则直接跳转
    const { redirect, path } = item
    if (redirect) {
      this.$router.push(redirect).catch((err) => {
        console.warn(err)
      })
      return
    }
    // 没有则拼接动态路由跳转到主路由
    this.$router.push(this.pathCompile(path)).catch((err) => {
      console.warn(err)
    })
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
