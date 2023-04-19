<!--
 * @FilePath: \vue-typescript-admin-template\src\views\excel\merge-header.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 14:10:06
 * @Reference: 引用方 src\layout\components\Sidebar\SidebarItem.vue
 * @Descripttion: 说明  框架-侧边栏-Excel-导出合并多级表头
-->

<template>
  <div class="app-container">
    <el-button
      :loading="downloadLoading"
      style="margin-bottom: 20px"
      type="primary"
      icon="el-icon-document"
      @click="handleDownload"
    >
      {{ $t('excel.export') }}
    </el-button>

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="{ $index }">
          {{ $index }}
        </template>
      </el-table-column>
      <el-table-column label="Main Information" align="center">
        <el-table-column label="Title">
          <template slot-scope="{ row }">
            {{ row.title }}
          </template>
        </el-table-column>
        <el-table-column label="Author" align="center" width="180">
          <template slot-scope="{ row }">
            <el-tag>{{ row.author }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Readings" align="center" width="115">
          <template slot-scope="{ row }">
            {{ row.pageviews }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="Date" width="220">
        <template slot-scope="{ row }">
          <i class="el-icon-time" />
          <span>{{ row.timestamp | parseTime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getArticles } from '@/api/articles' // 获取文章
import { IArticleData } from '@/api/types' // 文章类型
import { formatJson } from '@/utils' // 格式化
import { exportJson2Excel } from '@/utils/excel' // 导出脚本

@Component({
  name: 'MergeHeader'
})
export default class extends Vue {
  private list: IArticleData[] = []
  private listLoading = true
  private downloadLoading = false

  created() {
    this.fetchData()
  }

  private async fetchData() {
    this.listLoading = true
    const { data } = await getArticles({
      /* Your params here */
    })
    this.list = data.items
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  private handleDownload() {
    this.downloadLoading = true
    const multiHeader = [['Id', 'Main Information', '', '', 'Date']] // 多级表头
    const header = ['', 'Title', 'Author', 'Readings', ''] // 表头
    const filterVal = ['id', 'title', 'author', 'pageviews', 'timestamp']
    const list = this.list
    const data = formatJson(filterVal, list)
    const merges = ['A1:A2', 'B1:D1', 'E1:E2'] // 表头合并选项
    exportJson2Excel(header, data, 'merge-header', multiHeader, merges)
    this.downloadLoading = false
  }
}
</script>
