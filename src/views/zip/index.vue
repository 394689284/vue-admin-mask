<!--
 * @FilePath: \vue-typescript-admin-template\src\views\zip\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 11:44:43
 * @Reference: 引用方
 * @Descripttion: 说明 导出zip压缩包
-->

<template>
  <div class="app-container">
    <!-- 输入导出文件名字 -->
    <el-input
      v-model="filename"
      placeholder="Please enter the file name (default file)"
      style="width: 300px"
      prefix-icon="el-icon-document"
    />
    <el-button
      :loading="downloadLoading"
      style="margin-bottom: 20px"
      type="primary"
      icon="el-icon-document"
      @click="handleDownload"
    >
      Export Zip
    </el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="{ $index }">
          {{ $index }}
        </template>
      </el-table-column>
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
      <el-table-column label="Date" align="center" width="220">
        <template slot-scope="{ row }">
          <i class="el-icon-time" />
          <span>{{ row.timestamp }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getArticles } from '@/api/articles' // 获取文章数据
import { IArticleData } from '@/api/types' // 文章格式数据
import { formatJson } from '@/utils' // 压缩文件处理
import { exportTxt2Zip } from '@/utils/zip' // 压缩文件处理函数

@Component({
  name: 'ExportZip'
})
export default class extends Vue {
  private list: IArticleData[] = []
  private listLoading = true
  private downloadLoading = false
  private filename = ''
  // 获取文章数据
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

  // 文件压缩保存
  private handleDownload() {
    this.downloadLoading = true
    const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
    const filterVal = ['id', 'title', 'author', 'pageviews', 'timestamp']
    const list = this.list // 需要保存处理的数据
    const data = formatJson(filterVal, list)
    if (this.filename !== '') {
      exportTxt2Zip(tHeader, data, this.filename, this.filename)
    } else {
      exportTxt2Zip(tHeader, data)
    }
    this.downloadLoading = false
  }
}
</script>
