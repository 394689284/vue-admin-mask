<!--
 * @FilePath: \vue-typescript-admin-template\src\views\charts\mixed-chart.vue
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 15:15:41
 * @Reference: 引用方 src\layout\components\Sidebar\SidebarItem.vue
 * @Descripttion: 说明  框架-侧边栏-图表-混合图表
-->
<template>
  <div class="chart-container">
    <mixed-chart height="100%" width="100%" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MixedChart from '@/components/Charts/MixedChart.vue'

@Component({
  name: 'MixedChartDemo',
  components: {
    MixedChart
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
