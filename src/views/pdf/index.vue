<!--
 * @FilePath: \vue-typescript-admin-template\src\views\pdf\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 11:48:19
 * @Reference: 引用方 src\layout\components\Sidebar\SidebarItem.vue
 * @Descripttion: 说明 导出PDF图片
-->
<template>
  <div class="app-container">
    <aside style="margin-top: 15px">
      {{ $t('pdf.tips') }}
    </aside>
    <!-- 跳转PDF案例 -->
    <router-link target="_blank" to="/pdf-download-example">
      <el-button type="primary"> Click to download PDF </el-button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'PDF'
})
export default class extends Vue {}
</script>
