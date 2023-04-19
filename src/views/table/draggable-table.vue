<!--
 * @FilePath: \vue-typescript-admin-template\src\views\table\draggable-table.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-19 10:56:11
 * @Reference: 引用方 可拖动
 * @Descripttion: 说明 可拖拽表格简单
-->
<template>
  <div class="app-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table
      ref="draggableTable"
      v-loading="listLoading"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <!-- 头部ID -->
      <el-table-column align="center" label="ID" width="65">
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
      <!-- 标题 -->
      <el-table-column min-width="300px" label="Title">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
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
            class="icon-star"
          />
        </template>
      </el-table-column>
      <!-- 浏览量 -->
      <el-table-column align="center" label="Readings" width="95">
        <template slot-scope="{ row }">
          <span>{{ row.pageviews }}</span>
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | articleStatusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 可拖拽图标 -->
      <el-table-column align="center" label="Drag" width="80">
        <svg-icon
          class="draggable-handler"
          name="drag"
          width="20"
          height="20"
        />
      </el-table-column>
    </el-table>
    <!-- $t is vue-i18n global function to translate lang (lang in @/lang)  -->
    <!-- 当前默认顺序 -->
    <div class="show-d">
      <el-tag style="margin-right: 12px">
        {{ $t('table.dragTips1') }} :
      </el-tag>
      {{ oldList }}
    </div>
    <!-- 拖拽后顺序 -->
    <div class="show-d">
      <el-tag>{{ $t('table.dragTips2') }} :</el-tag> {{ newList }}
    </div>
  </div>
</template>

<script lang="ts">
import Sortable from 'sortablejs'
import { Component, Vue } from 'vue-property-decorator'
import { getArticles } from '@/api/articles'
import { IArticleData } from '@/api/types'

@Component({
  name: 'DraggableTable'
})
export default class extends Vue {
  private list: IArticleData[] = []
  private listLoading = true
  private total = []
  private oldList: number[] = []
  private newList: number[] = []
  private listQuery = {
    page: 1,
    limit: 10
  }

  private sortable: Sortable | null = null

  created() {
    this.getList()
  }

  // 获取文章数据
  private async getList() {
    this.listLoading = true
    const { data } = await getArticles(this.listQuery)
    this.list = data.items
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
    this.total = data.total
    this.oldList = this.list.map((v) => v.id)
    this.newList = this.oldList.slice()
    this.$nextTick(() => {
      this.setSort()
    })
  }

  // 开始排序
  private setSort() {
    const el = (this.$refs.draggableTable as Vue).$el.querySelectorAll(
      '.el-table__body-wrapper > table > tbody'
    )[0] as HTMLElement
    // 监听拖拽程序
    this.sortable = Sortable.create(el, {
      ghostClass: 'sortable-ghost', // Class name for the drop placeholder
      onEnd: (evt) => {
        if (
          typeof evt.oldIndex !== 'undefined' &&
          typeof evt.newIndex !== 'undefined'
        ) {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)
          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      }
    })
  }
}
</script>

<style lang="scss">
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>

<style lang="scss" scoped>
.icon-star {
  margin-right: 2px;
}

.draggable-handler {
  cursor: pointer;
}

.show-d {
  margin-top: 15px;
}
</style>
