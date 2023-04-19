<!--
 * @FilePath: \vue-typescript-admin-template\src\layout\components\Sidebar\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 15:47:55
 * @Reference: 引用方 src\layout\index.vue
 * @Descripttion: 说明 框架-侧边栏菜单——主组件
-->
<template>
  <!--显示LOGO-->
  <div :class="{ 'has-logo': showLogo }">
    <sidebar-logo v-if="showLogo" :collapse="isCollapse" />
    <!--滚动条-->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!--菜单栏 activeMenu 激活菜单的KEY-->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="menuActiveTextColor"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <!--侧边栏 路由的内容-->
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator' // VUE类装饰
import { AppModule } from '@/store/modules/app' // App管理状态
import { PermissionModule } from '@/store/modules/permission' // 路由权限状态管理
import { SettingsModule } from '@/store/modules/settings' // 设置状态管理
import SidebarItem from './SidebarItem.vue' // 侧边栏菜单内容
import SidebarLogo from './SidebarLogo.vue' // 侧边栏LOGO
import variables from '@/styles/_variables.scss' // 全局样式变量

@Component({
  name: 'SideBar',
  components: {
    SidebarItem,
    SidebarLogo
  }
})
export default class extends Vue {
  get sidebar() {
    // 侧边栏状态
    return AppModule.sidebar
  }

  // 角色权限
  get routes() {
    return PermissionModule.routes
  }

  // 显示LOGO
  get showLogo() {
    return SettingsModule.showSidebarLogo
  }

  // 获取激活菜单颜色默认和主题颜色一样
  get menuActiveTextColor() {
    if (SettingsModule.sidebarTextTheme) {
      return SettingsModule.theme
    } else {
      return variables.menuActiveText
    }
  }

  // 获取全部变量样式
  get variables() {
    return variables
  }

  // 获取激活菜单的index 更换路由后重新加载layout后会更换当前的路由路径
  get activeMenu() {
    const route = this.$route
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta?.activeMenu) {
      return meta.activeMenu
    }
    return path
  }

  // 获取侧边栏打开状态
  get isCollapse() {
    return !this.sidebar.opened
  }
}
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
