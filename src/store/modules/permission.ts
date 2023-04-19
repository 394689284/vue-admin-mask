/*
 * @FilePath: \vue-typescript-admin-template\src\store\modules\permission.ts
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 16:02:28
 * @Reference: 引用方 src\store\index.ts
 * @Descripttion: 说明 路由权限 状态管理
 */
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store'
// 判断是否拥有权限
const hasPermission = (roles: string[], route: RouteConfig) => {
  if (route.meta && route.meta.roles) {
    const restlt = roles.some(role => route.meta?.roles.includes(role))
    return restlt
  } else {
    return true
  }
}
/** 否则根据用户权限列表过滤权限 */
export const filterAsyncRoutes = (routes: RouteConfig[], roles: string[]) => {
  const res: RouteConfig[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}
/** 权限接口 */
export interface IPermissionState {
  routes: RouteConfig[]
  dynamicRoutes: RouteConfig[]
}
/** 权限 实现类 */
@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  /** 路由列表 */
  public routes: RouteConfig[] = []
  /** 动态路由列表 */
  public dynamicRoutes: RouteConfig[] = []
  // 添加设置路由
  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = constantRoutes.concat(routes)
    this.dynamicRoutes = routes
  }

  /** 生成过滤动态路由列表 */
  @Action
  public GenerateRoutes(roles: string[]) {
    // 如果权限包含 admin 则获得所有路由权限 否则根据权限列表过滤权限
    let accessedRoutes
    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    this.SET_ROUTES(accessedRoutes)
  }
}

export const PermissionModule = getModule(Permission)
