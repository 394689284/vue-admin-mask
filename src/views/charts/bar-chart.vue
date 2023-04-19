<!--
 * @FilePath: \vue-typescript-admin-template\src\views\charts\bar-chart.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 15:13:34
 * @Reference: 引用方 src\layout\components\Sidebar\SidebarItem.vue
 * @Descripttion: 说明  框架-侧边栏-图表-柱状图表
-->

<template>
  <div class="chart-container">
    <bar-chart height="100%" width="100%" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BarChart from '@/components/Charts/BarChart.vue' // 导入柱状图表插件

@Component({
  name: 'BarChartDemo',
  components: {
    BarChart
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
