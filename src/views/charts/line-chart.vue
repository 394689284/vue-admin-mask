<!--
 * @FilePath: \vue-typescript-admin-template\src\views\charts\bar-chart.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 15:13:34
 * @Reference: 引用方 src\layout\components\Sidebar\SidebarItem.vue
 * @Descripttion: 说明  框架-侧边栏-图表-趋势图
-->

<template>
  <div class="chart-container">
    <line-chart height="100%" width="100%" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LineChart from '@/components/Charts/LineChart.vue'

@Component({
  name: 'LineChartDemo',
  components: {
    LineChart
  }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
