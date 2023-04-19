<!--
 * @FilePath: \vue-typescript-admin-template\src\views\example\list.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 15:26:14
 * @Reference: 引用方
 * @Descripttion: 说明 框架-侧边栏-综合案例-文章列表
-->

<template>
  <div class="app-container">
    <!-- 表头 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <!-- 行id -->
      <el-table-column width="80" align="center" label="ID">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <!-- 时间 -->
      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="{ row }">
          <span>{{ row.timestamp | parseTime }}</span>
        </template>
      </el-table-column>
      <!-- 作者 -->
      <el-table-column width="180px" align="center" label="Author">
        <template slot-scope="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <!-- 重要性 -->
      <el-table-column width="105px" label="Importance">
        <template slot-scope="{ row }">
          <svg-icon
            v-for="n in +row.importance"
            :key="n"
            name="star"
            class="meta-item__icon"
          />
        </template>
      </el-table-column>
      <!-- 当前状态 -->
      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | articleStatusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 标题跳转可编辑 -->
      <el-table-column min-width="300px" label="Title">
        <template slot-scope="{ row }">
          <router-link :to="'/example/edit/' + row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>
      <!-- 编辑文章按钮 -->
      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="{ row }">
          <router-link :to="'/example/edit/' + row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 标记页面分页器 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getArticles } from '@/api/articles'
import { IArticleData } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'ArticleList',
  components: {
    Pagination
  }
})
export default class extends Vue {
  private total = 0
  private list: IArticleData[] = []
  private listLoading = true
  // 页数
  private listQuery = {
    page: 1,
    limit: 20
  }

  created() {
    this.getList()
  }

  // 获取文章数据
  private async getList() {
    this.listLoading = true
    const { data } = await getArticles(this.listQuery)
    this.list = data.items
    this.total = data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }
}
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
