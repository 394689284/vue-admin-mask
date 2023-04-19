<!--
 * @FilePath: \vue-typescript-admin-template\src\views\dashboard\admin\components\TransactionTable.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 19:27:53
 * @Reference: 引用方
 * @Descripttion: 说明 交易数据表
-->

<template>
  <!-- 设置表格尺寸 -->
  <el-table :data="list" style="width: 100%; padding-top: 15px">
    <!-- 数据ID -->
    <el-table-column label="OrderID" min-width="200">
      <template slot-scope="{ row }">
        <!-- 截取字符串过滤 -->
        {{ row.orderId | orderNoFilter }}
      </template>
    </el-table-column>
    <!-- 数据价格 -->
    <el-table-column label="Price" width="195" align="center">
      <template slot-scope="{ row }">
        <!-- 数据类型转换过滤 -->
        ¥{{ row.price | toThousandFilter }}
      </template>
    </el-table-column>
    <!-- 数据状态 -->
    <el-table-column label="Status" width="100" align="center">
      <template slot-scope="{ row }">
        <!-- 状态过滤 -->
        <el-tag :type="row.status | transactionStatusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getTransactions } from '@/api/transactions'
import { ITransactionData } from '@/api/types' // 请求数据

@Component({
  name: 'TransactionTable',
  filters: {
    // 状态过滤器
    transactionStatusFilter: (status: string) => {
      const statusMap: { [key: string]: string } = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }, // 截取字符串
    orderNoFilter: (str: string) => str.substring(0, 30),
    // Input 10000 => Output "10,000"
    // 数据类型转换
    toThousandFilter: (num: number) => {
      return (+num || 0)
        .toString()
        .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    }
  }
})
export default class extends Vue {
  private list: ITransactionData[] = []
  // 获取数据
  created() {
    this.fetchData()
  }

  private async fetchData() {
    // mock数据
    const { data } = await getTransactions({
      /* Your params here */
    })
    this.list = data.items.slice(0, 8)
  }
}
</script>
