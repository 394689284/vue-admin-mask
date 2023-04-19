<!--
 * @FilePath: \vue-typescript-admin-template\src\layout\components\Settings\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 15:48:46
 * @Reference: 引用方 src\layout\index.vue
 * @Descripttion: 说明 框架-右边浮动设置菜单抽屉容器
-->

<template>
  <div class="drawer-container">
    <div>
      <!--标题-->
      <h3 class="drawer-title">
        {{ $t('settings.title') }}
      </h3>
      <!--设置主题-->
      <div class="drawer-item">
        <span>{{ $t('settings.theme') }}</span>
        <theme-picker
          style="float: right; height: 26px; margin: -3px 8px 0 0"
          @change="themeChange"
        />
      </div>
      <!--是否显示标签栏-->
      <div class="drawer-item">
        <span>{{ $t('settings.showTagsView') }}</span>
        <el-switch v-model="showTagsView" class="drawer-switch" />
      </div>
      <!--是否显示logo-->
      <div class="drawer-item">
        <span>{{ $t('settings.showSidebarLogo') }}</span>
        <el-switch v-model="showSidebarLogo" class="drawer-switch" />
      </div>
      <!--是否固定头部-->
      <div class="drawer-item">
        <span>{{ $t('settings.fixedHeader') }}</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>
      <!--是否显示侧边栏文字颜色-->
      <div class="drawer-item">
        <span>{{ $t('settings.sidebarTextTheme') }}</span>
        <el-switch v-model="sidebarTextTheme" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SettingsModule } from '@/store/modules/settings'
import ThemePicker from '@/components/ThemePicker/index.vue' // 导入背景颜色选择组件

@Component({
  name: 'Settings',
  components: {
    ThemePicker
  }
})
export default class extends Vue {
  get fixedHeader() {
    // 判断是否固定
    return SettingsModule.fixedHeader
  }

  set fixedHeader(value) {
    // 设置固定状态
    SettingsModule.ChangeSetting({ key: 'fixedHeader', value })
  }

  get showTagsView() {
    // 判断是否打开标签栏
    return SettingsModule.showTagsView
  }

  set showTagsView(value) {
    // 设置是否打开标签栏
    SettingsModule.ChangeSetting({ key: 'showTagsView', value })
  }

  get showSidebarLogo() {
    // 判断显示logo
    return SettingsModule.showSidebarLogo
  }

  set showSidebarLogo(value) {
    // 设置显示logo
    SettingsModule.ChangeSetting({ key: 'showSidebarLogo', value })
  }

  get sidebarTextTheme() {
    // 判断侧边栏颜色
    return SettingsModule.sidebarTextTheme
  }

  set sidebarTextTheme(value) {
    // 设置侧边栏颜色
    SettingsModule.ChangeSetting({ key: 'sidebarTextTheme', value })
  }

  public themeChange(value: string) {
    // 设置主题颜色
    SettingsModule.ChangeSetting({ key: 'theme', value })
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
