/*
 * @FilePath: \vue-typescript-admin-template\src\store\modules\user.ts
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-17 16:04:00
 * @Reference: 引用方 src\store\index.ts
 * @Descripttion: 说明 登录用户 状态管理
 */
import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import { login, logout, getUserInfo } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import { TagsViewModule } from './tags-view'
import store from '@/store'
/** 用户 接口 */
export interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
  email: string
}
/** 用户 实现类 */
@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  /** 用户token */
  public token = getToken() || ''
  /** 用户名 */
  public name = ''
  /** 用户头像 */
  public avatar = ''
  /** 用户信息资料 */
  public introduction = ''
  /** 用户管理权限 */
  public roles: string[] = []
  /** 用户邮箱 */
  public email = ''
  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  // 设置用户名
  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  // 设置头像
  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  // 设置用户介绍
  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  // 设置用户权限
  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  // 设置用户邮箱
  @Mutation
  private SET_EMAIL(email: string) {
    this.email = email
  }

  /** 用户登录 */
  @Action({ root: false })
  public async Login(userInfo: { username: string, password: string }) {
    let { username, password } = userInfo
    username = username.trim()
    const { data } = await login({ username, password })
    setToken(data.accessToken)
    this.SET_TOKEN(data.accessToken)
    // 用户登陆成功设置token
  }

  /** 清除用户TOKEN */
  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  /** 获取用户信息 */
  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const { data } = await getUserInfo({
      /* Your params here */
    })
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    const { roles, name, avatar, introduction, email } = data.user
    // roles must be a non-empty array
    if (!roles || roles.length <= 0) {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
    // 设置
    this.SET_ROLES(roles)
    this.SET_NAME(name)
    this.SET_AVATAR(avatar)
    this.SET_INTRODUCTION(introduction)
    this.SET_EMAIL(email)
  }

  /** 更改用户权限 */
  @Action
  public async ChangeRoles(role: string) {
    // Dynamically modify permissions
    const token = role + '-token'
    this.SET_TOKEN(token)
    setToken(token)
    await this.GetUserInfo()
    // 重置路由
    resetRouter()
    // 重新生成基本路由
    PermissionModule.GenerateRoutes(this.roles)
    // 根据权限重新添加动态路由
    PermissionModule.dynamicRoutes.forEach(route => {
      router.addRoute(route)
    })
    // 删除重置访问过的所有标签视图模块
    // Reset visited views and cached views
    TagsViewModule.delAllViews()
  }

  /** 用户登出 */
  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    removeToken()
    resetRouter()

    // 重置视图缓存和token权限
    TagsViewModule.delAllViews()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }
}

export const UserModule = getModule(User)
