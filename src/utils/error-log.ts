/*
 * @FilePath: \vue-typescript-admin-template\src\utils\error-log.ts
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 16:34:58
 * @Reference: 引用方 src\main.ts
 * @Descripttion: 说明 初始化错误记录
 */
import Vue from 'vue'
import { ErrorLogModule } from '@/store/modules/error-log'
import { isArray } from '@/utils/validate'
import settings from '@/settings'

const { errorLog: needErrorLog } = settings
// 判断是否需要添加
const checkNeed = () => {
  const env = process.env.NODE_ENV
  if (isArray(needErrorLog) && env) {
    return needErrorLog.includes(env)
  }
  return false
}
/** 有添加日志记录则添加状态管理 Vue配置 */
if (checkNeed()) {
  Vue.config.errorHandler = function(err, vm, info) {
    ErrorLogModule.AddErrorLog({
      err,
      vm,
      info,
      url: window.location.href
    })
  }
}
