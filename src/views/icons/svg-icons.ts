/*
 * @FilePath: \vue-typescript-admin-template\src\views\icons\svg-icons.ts
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 10:16:17
 * @Reference: 引用方 src\views\icons\index.vue
 * @Descripttion: 说明生成svg图标名字
 */
/**
 * @description:导入过滤文件
 * @return {*}
 * 检索文件名,
 * 是否检索子文件夹
 * 正则匹配文件
 */
const req = require.context('../../icons/svg', false, /\.svg$/)
const re = /\.\/(.*)\.svg/
const requireAll = (requireContext: any) => requireContext.keys()

const icons = requireAll(req).map((str: string) => {
  const match = str.match(re)
  if (match !== null) return match[1]
  return null
})

export default icons
