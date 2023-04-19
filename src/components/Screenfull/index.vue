<!--
 * @FilePath: \vue-typescript-admin-template\src\components\Screenfull\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 16:51:31
 * @Reference: 引用方 src\layout\components\Navbar\index.vue
 * @Descripttion: 说明网页全局设置组件
-->
<!--网页全屏-->

<template>
  <div id="screenfull">
    <!--网页全屏按钮图标-->
    <svg-icon
      :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="click"
    />
  </div>
</template>

<script lang="ts">
import screenfull from 'screenfull' // 全屏插件后可自动判断全屏
import { Component, Vue } from 'vue-property-decorator'

const sf = screenfull

@Component({
  name: 'Screenfull'
})
export default class extends Vue {
  private isFullscreen = false

  mounted() {
    if (sf.isEnabled) {
      sf.on('change', this.change)
    }
  }

  // 移除监听事件
  beforeDestory() {
    if (sf.isEnabled) {
      sf.off('change', this.change)
    }
  }

  // 监听全屏事件
  private change() {
    if (sf.isEnabled) {
      this.isFullscreen = sf.isFullscreen
    }
  }

  // 点击后全屏切换全屏
  private click() {
    if (!sf.isEnabled) {
      this.$message({
        message: 'you browser can not work',
        type: 'warning'
      })
      return false
    }
    sf.toggle()
  }
}
</script>
