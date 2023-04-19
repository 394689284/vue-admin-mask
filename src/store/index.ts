/*
 * @FilePath: \vue-typescript-admin-template\src\store\index.ts
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 16:05:04
 * @Reference: 引用方 src\main.ts
 * @Descripttion: 说明 存储状态管理
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { IAppState } from './modules/app'// 应用接口
import { IUserState } from './modules/user'// 用户接口
import { ITagsViewState } from './modules/tags-view'// 标签栏视图模块
import { IErrorLogState } from './modules/error-log'// 错误模块
import { IPermissionState } from './modules/permission'// 路由权限模块
import { ISettingsState } from './modules/settings'// 设置模块

Vue.use(Vuex)

export interface IRootState {
  app: IAppState /** App 状态管理模块 */
  user: IUserState/** 用户 状态管理模块 */
  tagsView: ITagsViewState/** 标签栏视图 状态管理模块 */
  errorLog: IErrorLogState/** 错误 状态管理模块 */
  permission: IPermissionState/** 路由/权限 状态管理模块 */
  settings: ISettingsState/** 设置 状态管理模块 */
}

// 先导出然后动态添加功能模块
export default new Vuex.Store<IRootState>({})
