/*
 * @FilePath: \vue-typescript-admin-template\src\utils\clipboard.ts
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 11:20:34
 * @Reference: 引用方 src\views\icons\index.vue
 * @Descripttion: 说明 剪切板
 */

import Vue from 'vue'
import Clipboard from 'clipboard'// 剪切板模块
// 复制成功提示
export const clipboardSuccess = () =>
  Vue.prototype.$message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
// 复制错误提示
export const clipboardError = () =>
  Vue.prototype.$message({
    message: 'Copy failed',
    type: 'error'
  })
// 复制事件
export const handleClipboard = (text: string, event: MouseEvent) => {
  const clipboard = new Clipboard(event.target as Element, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  });
  (clipboard as any).onClick(event)
}
