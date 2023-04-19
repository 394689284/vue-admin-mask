/*
 * @FilePath: \vue-typescript-admin-template\src\components\Charts\mixins\resize.ts
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 19:14:45
 * @Reference: 引用方 src\views\dashboard\admin\components\LineChart.vue
 * @Descripttion: 说明 Echars 尺寸自适应
 */

import { ECharts } from 'echarts'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'ResizeMixin'
})
export default class extends Vue {
  protected chart!: ECharts | null
  private sidebarElm?: Element
  // 初始化自适应事件
  mounted() {
    this.initResizeEvent()
    this.initSidebarResizeEvent()
  }

  beforeDestroy() {
    this.destroyResizeEvent()
    this.destroySidebarResizeEvent()
  }

  activated() {
    this.initResizeEvent()
    this.initSidebarResizeEvent()
  }

  deactivated() {
    this.destroyResizeEvent()
    this.destroySidebarResizeEvent()
  }

  // 重置 chart尺寸
  private chartResizeHandler() {
    if (this.chart) {
      this.chart.resize()
    }
  }

  private sidebarResizeHandler(e: TransitionEvent) {
    if (e.propertyName === 'width') {
      this.chartResizeHandler()
    }
  }

  // 添加自适应事件
  private initResizeEvent() {
    if (this.chartResizeHandler) {
      window.addEventListener('resize', this.chartResizeHandler)
    }
  }

  private destroyResizeEvent() {
    if (this.chartResizeHandler) {
      window.removeEventListener('resize', this.chartResizeHandler)
    }
  }

  private initSidebarResizeEvent() {
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    if (this.sidebarElm) {
      this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler as EventListener)
    }
  }

  private destroySidebarResizeEvent() {
    if (this.sidebarElm) {
      this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler as EventListener)
    }
  }
}
