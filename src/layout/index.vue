<!--
 * @FilePath: \vue-typescript-admin-template\src\layout\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 14:57:17
 * @Descripttion: 说明 网页框架——主组件
-->
<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <!-- 侧边栏 -->
    <side-bar class="sidebar-container" />
    <!--显示标签栏-->
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <!--头部导航栏-->
        <navbar />
        <!-- 标签栏 -->
        <tags-view v-if="showTagsView" />
      </div>
      <!--主页面路由缓存容器-->
      <app-main />
      <!--显示右侧浮动设置菜单抽屉容器-->
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator' // Vue属性装饰器
import { mixins } from 'vue-class-component' // Vue class组件
import { DeviceType, AppModule } from '@/store/modules/app' // 导入设别类型/AppModule
import { SettingsModule } from '@/store/modules/settings' // 导入设置管理状态
import { AppMain, Navbar, Settings, SideBar, TagsView } from './components' // 导入子组件
import RightPanel from '@/components/RightPanel/index.vue' // 导入右边栏
import ResizeMixin from './mixin/resize' // 网页尺寸自适应

@Component({
  name: 'Layout',
  components: {
    AppMain, // 路由容器
    Navbar, // 导航组件
    RightPanel, // 浮动栏抽屉
    Settings, // 设置组件
    SideBar, // 侧边栏组件
    TagsView // 标签栏组件
  }
})
export default class extends mixins(ResizeMixin) {
  /** 获取状态 */
  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === DeviceType.Mobile
    }
  }

  // 是否显示设置按钮
  get showSettings() {
    return SettingsModule.showSettings
  }

  // 是否显示标签栏
  get showTagsView() {
    return SettingsModule.showTagsView
  }

  // 是否固定头部
  get fixedHeader() {
    return SettingsModule.fixedHeader
  }

  // 关闭侧边栏
  public handleClickOutside() {
    AppModule.CloseSideBar(false)
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }

  .fixed-header {
    width: calc(100% - 54px);
  }
}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform 0.28s;
    width: $sideBarWidth !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
