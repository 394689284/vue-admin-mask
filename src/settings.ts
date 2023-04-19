/*
 * @FilePath: \vue-typescript-admin-template\src\settings.ts
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 16:11:10
 * @Reference: 引用方 src\store\modules\settings.ts
 * @Descripttion: 说明 系统设置配置文件
 */
/*! 设置信息模块 */

interface ISettings {
  /** 覆盖默认标题 */
  title: string
  /** 控制设置面板的显示/隐藏 */
  showSettings: boolean
   /** 控制标签视图的显示/隐藏 */
  showTagsView: boolean
   /** 控制LOGO的显示/隐藏 */
  showSidebarLogo: boolean
   /** 固定头部的控制 */
  fixedHeader: boolean
   /** 启用错误信息提示 默认仅仅为生产环境 */
  errorLog: string[]
   /** 如果为真，将根据主题更改侧边栏的活动文本颜色 */
  sidebarTextTheme: boolean
}

const settings: ISettings = {
  title: 'Vue Typescript Admin',
  showSettings: true,
  showTagsView: true,
  fixedHeader: true,
  showSidebarLogo: false,
  errorLog: ['production'],
  sidebarTextTheme: true
}

export default settings
