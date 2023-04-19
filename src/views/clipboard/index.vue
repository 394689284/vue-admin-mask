<!--
 * @FilePath: \vue-typescript-admin-template\src\views\clipboard\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 11:08:38
 * @Reference: 引用方 src\layout\components\Sidebar\SidebarItem.vue
 * @Descripttion: 说明 框架-侧边栏-粘切板
-->

<template>
  <div class="app-container">
    <!-- 选项卡 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="use clipboard directly" name="directly">
        <el-input
          v-model="inputData"
          placeholder="Please input"
          style="width: 400px; max-width: 100%"
        />
        <el-button
          type="primary"
          icon="el-icon-document"
          @click="handleClipboard(inputData, $event)"
        >
          copy
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="use clipboard by v-directive" name="v-directive">
        <el-input
          v-model="inputData"
          placeholder="Please input"
          style="width: 400px; max-width: 100%"
        />
        <el-button
          v-clipboard:copy="inputData"
          v-clipboard:success="clipboardSuccess"
          type="primary"
          icon="el-icon-document"
        >
          copy
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { handleClipboard, clipboardSuccess } from '@/utils/clipboard' // 注册复制剪切板事件

@Component({
  name: 'Clipboard'
})
export default class extends Vue {
  private activeName = 'directly'
  private inputData = 'https://github.com/Armour/vue-typescript-admin-template'
  private clipboardSuccess = clipboardSuccess
  private handleClipboard = handleClipboard
}
</script>
