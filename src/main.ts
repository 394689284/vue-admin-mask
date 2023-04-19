/*
 * @FilePath: \vue-typescript-admin-template\src\main.ts
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 16:14:27
 * @Reference: 引用方
 * @Descripttion: 说明
 */
import Vue from 'vue'
import 'normalize.css' // 引入系统样式初始化
import ElementUI from 'element-ui' // 引入element-ui
import SvgIcon from 'vue-svgicon' // 引入svg图标
import 'element-ui/lib/theme-chalk/index.css' // 引入element-ui全局样式
import '@/styles/element-variables.scss' // 引入element样式初始设置
import '@/styles/index.scss' // 引入样式主文件
import App from '@/App.vue' // 引入Vue App
import store from '@/store' // 引入状态存储
import router from '@/router' // 引入路由
import i18n from '@/lang' // 引入国际化语言包
import '@/icons/components' // 引入svg图标组件
import '@/permission' // 引入路由导航守卫
import '@/utils/error-log' // 引入错误模块
import * as directives from '@/directives' // 引入自定义指令文件
import * as filters from '@/filters' // 引入自定义过滤文件
import { DirectiveOptions } from 'vue/types/umd'
// 注册ElementUI
Vue.use(ElementUI, {
  // size: AppModule.size, // 设置element-ui默认尺寸
  i18n: (key: string, value: string) => i18n.t(key, value)
})
// 注册SvgIcon图
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})
// 注册自定义指令
Object.keys(directives).forEach((key) => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
})

// 注册过滤器函数
Object.keys(filters).forEach((key) => {
  Vue.filter(key, (filters as unknown as { [key: string]: () => void })[key])
})
// 隐藏生产提示
Vue.config.productionTip = false
// 创建VUE 实例
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
