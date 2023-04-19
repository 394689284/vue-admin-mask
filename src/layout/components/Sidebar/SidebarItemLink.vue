<!--
 * @FilePath: \vue-typescript-admin-template\src\layout\components\Sidebar\SidebarItemLink.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 15:45:53
 * @Reference: 引用方 src\layout\components\Sidebar\SidebarItem.vue
 * @Descripttion: 说明 框架-侧边栏菜单-菜单链接——子组件
-->
<template>
  <!--如果带链接 直接打开新窗口-->
  <a v-if="isExternal(toPath)" :href="toPath" target="_blank" rel="noopener">
    <slot />
  </a>
  <!--如果不带链接则打开-->
  <router-link v-else :to="toPath">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { isExternal } from '@/utils/validate'

@Component({
  name: 'SidebarItemLink'
})
export default class extends Vue {
  @Prop({ required: true }) public to!: string
  get toPath() {
    return this.to.replace(/^\/http/, 'http')
  }

  public isExternal = isExternal
}
</script>
