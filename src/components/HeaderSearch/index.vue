<!--
 * @FilePath: \vue-typescript-admin-template\src\components\HeaderSearch\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 16:46:11
 * @Reference: 引用方 src\layout\components\Navbar\index.vue
 * @Descripttion: 说明 框架-头部导航栏-搜索框-下拉建议选择框
-->
<template>
  <!--缩放/放大-->
  <div id="header-search" :class="{ show: show }" class="header-search">
    <!--搜索图标-->
    <svg-icon class="search-icon" name="search" @click.stop="click" />
    <!--下拉建议输入选择框-->
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <!--建议选项-->
      <el-option
        v-for="item in options"
        :key="item.path"
        :value="item"
        :label="item.meta?.title.join(' > ')"
      />
    </el-select>
  </div>
</template>

<script lang="ts">
import path from 'path'
import Fuse from 'fuse.js' // 轻量级搜索过滤模块
import { Component, Vue, Watch } from 'vue-property-decorator'
import { RouteConfig, RouteMeta } from 'vue-router'
import { AppModule } from '@/store/modules/app'
import { PermissionModule } from '@/store/modules/permission'
import i18n from '@/lang' // Internationalization

@Component({
  name: 'HeaderSearch'
})
export default class extends Vue {
  public search = ''
  public show = false
  public options: RouteConfig[] = []
  private searchPool: RouteConfig[] = []
  private fuse?: Fuse<RouteConfig>
  // 路由列表
  get routes() {
    return PermissionModule.routes
  }

  // 当前语言
  get lang() {
    return AppModule.language
  }

  @Watch('lang')
  private onLangChange() {
    this.searchPool = this.generateRoutes(this.routes)
  }

  @Watch('routes')
  private onRoutesChange() {
    this.searchPool = this.generateRoutes(this.routes)
  }

  @Watch('searchPool')
  private onSearchPoolChange(value: RouteConfig[]) {
    this.initFuse(value)
  }

  @Watch('show')
  private onShowChange(value: boolean) {
    if (value) {
      document.body.addEventListener('click', this.close)
    } else {
      document.body.removeEventListener('click', this.close)
    }
  }

  mounted() {
    this.searchPool = this.generateRoutes(this.routes)
  }

  public click() {
    this.show = !this.show
    if (this.show) {
      this.$refs.headerSearchSelect &&
        (this.$refs.headerSearchSelect as HTMLElement).focus()
    }
  }

  private close() {
    this.$refs.headerSearchSelect &&
      (this.$refs.headerSearchSelect as HTMLElement).blur()
    this.options = []
    this.show = false
  }

  // 选择了搜索项
  public change(route: RouteConfig) {
    this.$router.push(route.path).catch((err) => {
      console.warn(err)
    })
    this.search = ''
    this.options = []
    this.$nextTick(() => {
      this.show = false
    })
  }

  // 初始化模糊搜索选项
  public initFuse(list: RouteConfig[]) {
    this.fuse = new Fuse(list, {
      shouldSort: true, // 匹配结果排序
      threshold: 0.4, // 匹配度阈值 0.0表示完全匹配(字符和位置)；1.0将会匹配所有值
      location: 0, // 匹配的字符预期的位置 匹配到的字符距离指定位置越近分数越高
      distance: 100, // l匹配的字符在location指定位置的范围
      minMatchCharLength: 1, // 最小匹配长度  可用于需要至少几个字符才执行搜索的场景
      keys: [
        {
          name: 'title',
          weight: 0.7
        },
        {
          name: 'path',
          weight: 0.3
        }
      ]
    })
  }

  // 过滤生成在侧边栏的路由
  // 并生成国际化的程序
  private generateRoutes(
    routes: RouteConfig[],
    basePath = '/',
    prefixTitle: string[] = []
  ) {
    let res: RouteConfig[] = []

    for (const router of routes) {
      // skip hidden router
      if (router.meta && router.meta.hidden) {
        continue
      }

      const data: RouteConfig & { meta: RouteMeta } = {
        path: path.resolve(basePath, router.path),
        meta: {
          title: [...prefixTitle]
        }
      }

      if (router.meta && router.meta.title) {
        // generate internationalized title
        const i18ntitle = i18n.t(`route.${router.meta.title}`).toString()
        data.meta.title = [...data.meta.title, i18ntitle]
        if (router.redirect !== 'noRedirect') {
          // only push the routes with title
          // special case: need to exclude parent router without redirect
          res.push(data)
        }
      }

      // recursive child routes
      if (router.children) {
        const tempRoutes = this.generateRoutes(
          router.children,
          data.path,
          data.meta.title
        )
        if (tempRoutes.length >= 1) {
          res = [...res, ...tempRoutes]
        }
      }
    }
    return res
  }

  // 远程搜索函数
  public querySearch(query: string) {
    if (query !== '') {
      if (this.fuse) {
        this.options = this.fuse.search(query).map((result) => result.item)
      }
    } else {
      this.options = []
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
