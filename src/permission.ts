/*
 * @FilePath: \vue-typescript-admin-template\src\permission.ts
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 16:13:12
 * @Reference: 引用方 src\main.ts
 * @Descripttion: 说明 路由导航守卫
 */
import router from './router'
import NProgress from 'nprogress' // 加载进度条
import 'nprogress/nprogress.css' // 进度条样式
import { Message } from 'element-ui' // 信息提示框
import { Route } from 'vue-router' // 路由接口
import { UserModule } from '@/store/modules/user' // 用户管理状态模块
import { PermissionModule } from '@/store/modules/permission' // 路由权限状态管理
import i18n from '@/lang' // 国际化语言
import settings from './settings' // 设置
NProgress.configure({ showSpinner: false }) // 进度条设置

const whiteList = ['/login', '/auth-redirect'] // 通用白名单路由
// 获取页面标题
const getPageTitle = (key: string) => {
  // 转换国际化成功显示 否则显示固定标题W
  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`)
    return `${pageName} - ${settings.title}`
  }
  return `${settings.title}`
}

/** 路由导航守卫处理 */
router.beforeEach(async (to: Route, _: Route, next: any) => {
  // 进度条开始
  NProgress.start()
  // 判断用户是否已登录
  if (UserModule.token) {
    // 如果路径是/login 直接登录进主页面
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 如果用户权限为0
      if (UserModule.roles.length === 0) {
        try {
          // 获取用户权限
          await UserModule.GetUserInfo()
          const roles = UserModule.roles
          // 根据获得权限生成动态路由
          PermissionModule.GenerateRoutes(roles)
          // 添加动态路由

          PermissionModule.dynamicRoutes.forEach((route) => {
            router.addRoute(route)
          })

          // 跳转到要访问的路由
          next({ ...to, replace: true })
        } catch (err) {
          // 访问/验证失败/权限不足 产生错误则重置TOKEN后跳转到登录页面
          console.error(err)
          UserModule.ResetToken()
          Message.error('Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        // 验证成功直接跳转 如果未添加路由提示404
        next()
      }
    }
  } else {
    // 判断是白名单路径 任何用户直接跳转
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 不是白名单用户登录后携带路径跳转
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
// 路由跳转成功设置当前页面标题
router.afterEach((to: Route) => {
  NProgress.done()
  document.title = getPageTitle(to.meta?.title)
})
