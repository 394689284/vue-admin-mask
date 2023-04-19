<!--
 * @FilePath: \vue-typescript-admin-template\src\views\icons\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 10:30:56
 * @Reference: 引用方 src\layout\components\Sidebar\SidebarItem.vue
 * @Descripttion: 说明 svg图标
-->

<template>
  <!-- icons容器 -->
  <div class="icons-container">
    <!-- 头部添加和使用 -->
    <aside>
      <a
        href="https://armour.github.io/vue-typescript-admin-docs/guide/advanced/icon.html"
        target="_blank"
        >Add and use
      </a>
    </aside>
    <!-- 选项卡 -->
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div class="grid">
          <div
            v-for="item of svgIcons"
            :key="item"
            @click="handleClipboard(generateSvgIconCode(item), $event)"
          >
            <!-- 生成svg图标代表 -->
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateSvgIconCode(item) }}
              </div>
              <div class="icon-item">
                <svg-icon :name="item" class="disabled" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div class="grid">
          <div
            v-for="item of elementIcons"
            :key="item"
            @click="handleClipboard(generateElementIconCode(item), $event)"
          >
            <!-- 生成el-icon图标代表 -->
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateElementIconCode(item) }}
              </div>
              <div class="icon-item">
                <i :class="'el-icon-' + item" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { handleClipboard } from '@/utils/clipboard' // 剪切板
import elementIcons from './element-icons' // 图标
import svgIcons from './svg-icons' // svg组件

@Component({
  name: 'Icons'
})
export default class extends Vue {
  private svgIcons = svgIcons
  private elementIcons = elementIcons
  private handleClipboard = handleClipboard
  // 生成el-icon图标
  private generateElementIconCode(symbol: string) {
    return `<i class="el-icon-${symbol}" />`
  }

  // 生成svg图标
  private generateSvgIconCode(symbol: string) {
    return `<svg-icon name="${symbol}" />`
  }
}
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
