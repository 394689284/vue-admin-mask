/*
 * @FilePath: \vue-typescript-admin-template\src\store\modules\settings.ts
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 16:03:18
 * @Reference: 引用方 src\store\index.ts
 * @Descripttion: 说明 系统设置 状态管理
 */
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import elementVariables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
/** 设置 接口 */
export interface ISettingsState {
  theme: string
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  sidebarTextTheme: boolean
}
/** 设置 实现类 */
@Module({ dynamic: true, store, name: 'settings' })
class Settings extends VuexModule implements ISettingsState {
  /** 主题 */
  public theme = elementVariables.theme
  /** 固定头部 */
  public fixedHeader = defaultSettings.fixedHeader
  /** 显示/隐藏 设置按钮 */
  public showSettings = defaultSettings.showSettings
  /** 显示/隐藏 标签栏视图 */
  public showTagsView = defaultSettings.showTagsView
  /** 显示/隐藏 LOGO */
  public showSidebarLogo = defaultSettings.showSidebarLogo
  /** 如果为真，将根据主题更改侧边栏的活动文本颜色 */
  public sidebarTextTheme = defaultSettings.sidebarTextTheme
  /** 更改设置同步 */
  @Mutation
  private CHANGE_SETTING(payload: { key: string, value: any }) {
    const { key, value } = payload
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      (this as any)[key] = value
    }
  }

  /** 更改设置异步 */
  @Action
  public ChangeSetting(payload: { key: string, value: any }) {
    this.CHANGE_SETTING(payload)
  }
}

export const SettingsModule = getModule(Settings)
