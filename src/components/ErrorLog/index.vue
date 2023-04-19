<!--
 * @FilePath: \vue-typescript-admin-template\src\components\ErrorLog\index.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 15:11:01
 * @Reference: 引用方 src\layout\components\Navbar\index.vue
 * @Descripttion: 说明 错误日志组件
-->

<template>
  <div v-if="errorLogs.length > 0">
    <!-- 徽标 -->
    <el-badge
      :is-dot="true"
      style="line-height: 25px; margin-top: -5px"
      @click.native="dialogTableVisible = true"
    >
      <el-button style="padding: 8px 10px" size="small" type="danger">
        <svg-icon name="bug" />
      </el-button>
    </el-badge>
    <!-- 错误显示卡 -->
    <el-dialog :visible.sync="dialogTableVisible" width="80%" append-to-body>
      <div slot="title">
        <span style="padding-right: 10px">Error Log</span>
        <!-- 清除所有错误 -->
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-delete"
          @click="clearAll"
        >
          Clear All
        </el-button>
      </div>
      <!-- 错误数据列表 -->
      <el-table :data="errorLogs" border>
        <el-table-column label="Message">
          <template slot-scope="{ row }">
            <div>
              <span class="message-title">Msg:</span>
              <el-tag type="danger">
                {{ row.err.message }}
              </el-tag>
            </div>
            <br />
            <div>
              <span class="message-title" style="padding-right: 10px"
                >Info:
              </span>
              <el-tag type="warning">
                {{ row?.vm?.$vnode?.tag }} error in {{ row.info }}
              </el-tag>
            </div>
            <br />
            <div>
              <span class="message-title" style="padding-right: 16px"
                >Url:
              </span>
              <el-tag type="success">
                {{ row.url }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 错误堆栈 -->
        <el-table-column label="Stack">
          <template slot-scope="{ row }">
            {{ row.err.stack }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ErrorLogModule } from '@/store/modules/error-log'

@Component({
  name: 'ErrorLog'
})
export default class extends Vue {
  private dialogTableVisible = false

  get errorLogs() {
    return ErrorLogModule.logs
  }

  private clearAll() {
    this.dialogTableVisible = false
    ErrorLogModule.ClearErrorLog()
  }
}
</script>

<style lang="scss" scoped>
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
</style>
