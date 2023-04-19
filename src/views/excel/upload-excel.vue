<!--
 * @FilePath: \vue-typescript-admin-template\src\views\excel\upload-excel.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 14:41:15
 * @Reference: 引用方 src\layout\components\Sidebar\SidebarItem.vue
 * @Descripttion: 说明 框架-侧边栏-Excel-上传数据表
-->

<template>
  <div class="app-container">
    <upload-excel-component
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    />
    <el-table
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        v-for="item of tableHeader"
        :key="item"
        :prop="item"
        :label="item"
      />
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UploadExcelComponent from '@/components/UploadExcel/index.vue' // 上传Excel表组件

@Component({
  name: 'UploadExcel',
  components: {
    UploadExcelComponent
  }
})
export default class extends Vue {
  private tableData: any = []
  private tableHeader: string[] = []
  // 上传太大阻止继续上传事件
  private beforeUpload(file: File) {
    const isLt1M = file.size / 1024 / 1024 < 1
    if (isLt1M) {
      return true
    }
    this.$message({
      message: 'Please do not upload files larger than 1m in size.',
      type: 'warning'
    })
    return false
  }

  // 上传成功事件
  private handleSuccess({
    results,
    header
  }: {
    results: any
    header: string[]
  }) {
    this.tableData = results // 数据结构
    this.tableHeader = header // 数据头
  }
}
</script>
