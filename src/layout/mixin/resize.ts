/*
 * @FilePath: \vue-typescript-admin-template\src\layout\mixin\resize.ts
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 15:56:13
 * @Reference: 引用方 src\layout\index.vue
 * @Descripttion: 说明 网页尺寸自适应适配
 */
import { Component, Vue, Watch } from 'vue-property-decorator'
import { AppModule, DeviceType } from '@/store/modules/app'

const WIDTH = 992 // 移动尺寸判断标准小于则为Mobile

@Component({
  name: 'ResizeMixin'
})
export default class extends Vue {
  /** 获取设备类型 */
  get device() {
    return AppModule.device
  }

  /** 获取侧边栏状态 */
  get sidebar() {
    return AppModule.sidebar
  }

  /** 监控设备改变 */
  @Watch('$route')
  private onRouteChange() {
    if (this.device === DeviceType.Mobile && this.sidebar.opened) {
      AppModule.CloseSideBar(false)
    }
  }

  // 载入后 开启resize监听事件
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  }

  // 载入后 如果是移动端关闭侧边栏
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      AppModule.ToggleDevice(DeviceType.Mobile)
      AppModule.CloseSideBar(true)
    }
  }

  // 销毁前取消监听尺寸改变事件
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  // 判断是否Mobile
  private isMobile() {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  // resize事件
  private resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      AppModule.ToggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop)
      if (isMobile) {
        AppModule.CloseSideBar(true)
      }
    }
  }
}
