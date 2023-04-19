<!--
 * @FilePath: \vue-typescript-admin-template\src\views\excel\export-excel.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 14:11:29
 * @Reference: 引用方 src\layout\components\Sidebar\SidebarItem.vue
 * @Descripttion: 说明  框架-侧边栏-Excel-导出全部excel
-->

<template>
  <div class="app-container">
    <div>
      <!-- 文件名输入 -->
      <filename-option v-model="filename" />
      <!-- 自动撑开宽度选项 -->
      <auto-width-option v-model="autoWidth" />
      <!-- 文件类型选项 -->
      <book-type-option v-model="bookType" />
      <el-button
        :loading="downloadLoading"
        style="margin: 0 0 20px 20px"
        type="primary"
        icon="el-icon-document"
        @click="handleDownload"
      >
        {{ $t('excel.export') }} Excel
      </el-button>
      <!-- 链接 -->
      <a
        href="https://armour.github.io/vue-typescript-admin-docs/features/components/excel.html"
        target="_blank"
        style="margin-left: 15px"
      >
        <el-tag type="info">Documentation</el-tag>
      </a>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row
    >
      <!-- 表格数据 -->
      <el-table-column width="95" align="center" label="Id">
        <template slot-scope="{ $index }">
          {{ $index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="{ row }">
          {{ row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="180" align="center">
        <template slot-scope="{ row }">
          <el-tag>{{ row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="115" align="center" label="Readings">
        <template slot-scope="{ row }">
          {{ row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column width="220" align="center" label="Date">
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
import { getArticles } from '@/api/articles' // 读取数据
import { IArticleData } from '@/api/types' // 文章类型
import { formatJson } from '@/utils' // 格式化json数据
import { exportJson2Excel } from '@/utils/excel' // 导出Excel 脚本
import FilenameOption from './components/FilenameOption.vue' // 文件名组件
import AutoWidthOption from './components/AutoWidthOption.vue' // 自动宽度选项组件
import BookTypeOption from './components/BookTypeOption.vue' // 导出类型选项

@Component({
  name: 'ExportExcel',
  components: {
    AutoWidthOption,
    BookTypeOption,
    FilenameOption
  }
})
export default class extends Vue {
  private list: IArticleData[] = []
  private listLoading = true
  private downloadLoading = false
  private filename = ''
  private autoWidth = true
  private bookType = 'xlsx'
  // 读取数据
  created() {
    this.fetchData()
  }

  // 读取文章数据
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

  // 开始处理
  private handleDownload() {
    this.downloadLoading = true
    const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
    const filterVal = ['id', 'title', 'author', 'pageviews', 'timestamp'] // 变量值
    const list = this.list
    const data = formatJson(filterVal, list)
    exportJson2Excel(
      tHeader, // 表头
      data, // 数据
      this.filename !== '' ? this.filename : undefined, // 文件名
      undefined, // 多级表头导出选项
      undefined, // 合并表头项
      this.autoWidth, // 自动列宽
      this.bookType // 类型
    )
    this.downloadLoading = false
  }
}
</script>

<style lang="scss">
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
