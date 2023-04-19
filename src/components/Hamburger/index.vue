<!--
 * @FilePath: \vue-typescript-admin-template\src\components\Hamburger\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 16:41:53
 * @Reference: 引用方 src\layout\components\Navbar\index.vue
 * @Descripttion: 说明 框架-头部导航条-汉堡包按钮
-->
<template>
  <div :class="[{ 'is-active': isActive }]" @click="toggleClick">
    <svg-icon name="hamburger" width="20" height="20" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'Hamburger'
})
export default class extends Vue {
  @Prop({ default: false }) private isActive!: boolean
  // 像父组件触发缩小
  private toggleClick() {
    this.$emit('toggle-click')
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: middle;
}

.is-active {
  transform: rotate(180deg);
}
</style>
