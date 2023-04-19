/*
 * @FilePath: \vue-typescript-admin-template\src\store\modules\error-log.ts
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 16:01:56
 * @Reference: 引用方 src\store\index.ts
 * @Descripttion: 说明 错误记录 状态管理
 */
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
/** 错误 接口 */
interface IErrorLog {
  err: Error /** 普通 错误 */
  vm: any /** VN 错误 */
  info: string /** 信息 错误 */
  url: string /** URL错误 */
}
export interface IErrorLogState {
  logs: IErrorLog[]
}
/** 错误 实现类 */
@Module({ dynamic: true, store, name: 'errorLog' })
class ErrorLog extends VuexModule implements IErrorLogState {
  /** 错误类型 数组 */
  public logs: IErrorLog[] = []

  @Mutation
  private ADD_ERROR_LOG(log: IErrorLog) {
    this.logs.push(log)
  }

  @Mutation
  private CLEAR_ERROR_LOG() {
    this.logs.splice(0)
  }

  /** 添加错误类型 */
  @Action
  public AddErrorLog(log: IErrorLog) {
    this.ADD_ERROR_LOG(log)
  }

  /** 清除错误类型 */
  @Action
  public ClearErrorLog() {
    this.CLEAR_ERROR_LOG()
  }
}

export const ErrorLogModule = getModule(ErrorLog)
