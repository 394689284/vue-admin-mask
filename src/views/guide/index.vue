<!--
 * @FilePath: \vue-typescript-admin-template\src\views\guide\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 11:01:09
 * @Reference: 引用方 src\layout\components\Sidebar\SidebarItem.vue
 * @Descripttion: 说明 新手引导
-->

<template>
  <div class="app-container">
    <!-- 引导页头部介绍 -->
    <aside>
      {{ $t('guide.description') }}
      <a href="https://github.com/kamranahmedse/driver.js" target="_blank"
        >driver.js.</a
      >
    </aside>
    <!-- 引导页按钮 -->
    <el-button
      icon="el-icon-question"
      type="primary"
      @click.prevent.stop="guide"
    >
      {{ $t('guide.button') }}
    </el-button>
  </div>
</template>

<script lang="ts">
import Driver from 'driver.js' // 引导模块
import 'driver.js/dist/driver.min.css' // 引导模块样式
import { Component, Vue } from 'vue-property-decorator'
import steps from './steps' // 导入引导步骤

@Component({
  name: 'Guide'
})
export default class extends Vue {
  private driver: Driver | null = null
  // 初始化引导模块实例
  mounted() {
    this.driver = new Driver()
  }

  // 引导事件步骤
  private guide() {
    if (this.driver) {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
}
</script>
