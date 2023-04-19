<!--
 * @FilePath: \vue-typescript-admin-template\src\components\RightPanel\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 18:05:32
 * @Reference: 引用方 src\layout\index.vue
 * @Descripttion: 说明 框架-右部浮动设置抽屉
-->
<template>
  <!-- 浮动容器 -->
  <div ref="rightPanel" :class="{ show: show }" class="rightPanel-container">
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <!-- 浮动显示按钮-->
      <div
        class="handle-button"
        :style="{ top: buttonTop + 'px', 'background-color': theme }"
        @click="show = !show"
      >
        <!-- 浮动抽拉箭头 -->
        <i :class="show ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'" />
      </div>
      <div class="rightPanel-items">
        <!-- 插槽 -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { addClass, removeClass } from '@/utils'
import { SettingsModule } from '@/store/modules/settings'

@Component({
  name: 'RightPanel'
})
export default class extends Vue {
  @Prop({ default: false }) private clickNotClose!: boolean
  @Prop({ default: 250 }) public buttonTop!: number // 顶部间距

  public show = false
  // 设置主题颜色
  get theme() {
    return SettingsModule.theme
  }

  // 监听显示事件
  @Watch('show')
  private onShowChange(value: boolean) {
    if (value && !this.clickNotClose) {
      this.addEventClick()
    }
    if (value) {
      // 添加一个全屏覆盖
      addClass(document.body, 'showRightPanel')
    } else {
      // 移除全屏覆盖
      removeClass(document.body, 'showRightPanel')
    }
  }

  mounted() {
    this.insertToBody()
  }

  // 组件删除前销毁元素
  beforeDestroy() {
    const elx = this.$refs.rightPanel as Element
    elx.remove()
  }

  // 监听全屏覆盖关闭
  private addEventClick() {
    window.addEventListener('click', this.closeSidebar)
  }

  // 关闭全屏覆盖关闭事件
  private closeSidebar(ev: MouseEvent) {
    const parent = (ev.target as HTMLElement).closest('.rightPanel')
    if (!parent) {
      this.show = false
      window.removeEventListener('click', this.closeSidebar)
    }
  }

  // 初始化后插入到网页主体
  private insertToBody() {
    const elx = this.$refs.rightPanel as Element
    const body = document.querySelector('body')
    if (body) {
      body.insertBefore(elx, body.firstChild)
    }
  }
}
</script>

<style lang="scss">
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>

<style lang="scss" scoped>
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

.rightPanel {
  width: 100%;
  max-width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 40000;
}

.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .rightPanel-background {
    z-index: 20000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .rightPanel {
    transform: translate(0);
  }
}

.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -48px;
  text-align: center;
  font-size: 10px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  cursor: pointer;
  pointer-events: auto;
  color: #fff;
  line-height: 48px;

  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
