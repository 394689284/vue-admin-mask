/*
 * @FilePath: \vue-typescript-admin-template\src\router\index.ts
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 16:39:58
 * @Reference: 引用方 src\main.ts
 * @Descripttion: 说明 主路由配置
 */
/*! 路由 */

import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

/* 页面框架 */
import Layout from '@/layout/index.vue'

/* 路由模块 */
import componentsRouter from './modules/components'// 组件路由模块
import chartsRouter from './modules/charts'// 图标路由模模块
import tableRouter from './modules/table'// 表格路由模块
import nestedRouter from './modules/nested'// 嵌套路由模块

Vue.use(VueRouter)

/*
 提示子菜单数量>=1时才会显示
*/

/*
  name:'router-name'           当使用<keep-alive>时，name字段是必需的，它还应该匹配其组件的name属性
  redirect:                    如果设置为“noredirect”，则单击面包屑时不会触发重定向操作
  meta: {
    roles: ['admin', 'editor']   页面角色(允许设置多个角色)
    title: 'title'               在subMenu和breadcrumb中显示的名称(推荐集)
    icon: 'svg-name'             在侧边栏中显示的图标
    hidden: true                 如果为true，此路由将不会显示在侧栏中(默认为false)
    alwaysShow: true             如果为true，将始终显示此菜单
    breadcrumb: false            隐藏面包屑中的菜单
    noCache: true                如果为true，该路由页面将不会被缓存(默认为false)
    affix: true                  如果为真，则标签将被粘贴到标签视图中
    activeMenu: '/example/list'  如果设置了路径，侧边栏将突出显示所设置的路径
  }
*/

/**
  固定路由
  没有权限要求的基本页所有角色均可访问
*/
export const constantRoutes: RouteConfig[] = [
  {
  // 重定向跳转页面
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)', // 正则路由匹配任何路径 如'/redirect/my'重定向到/my
        // webpackChunkName webpack分割页面文件时的名字 不能删除
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  { // 登录页面
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    // 已认证直连
    path: '/auth-redirect',
    component: () => import(/* webpackChunkName: "auth-redirect" */ '@/views/login/auth-redirect.vue'),
    meta: { hidden: true }
  },
  { // 404 找不到该页面
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  { // 401 未授权无法访问
    path: '/401',
    component: () => import(/* webpackChunkName: "401" */ '@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
  { // 网站首页 登录后任何角色 验证失败跳转到login界面
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    // 引导教程页面 登录后任何角色
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "guide" */ '@/views/guide/index.vue'),
        name: 'Guide',
        meta: {
          title: 'guide',
          icon: 'guide',
          noCache: true
        }
      }
    ]
  },
  {
    // 用户基本信息个人中心 登录后任何角色 重定向到首页
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    meta: { hidden: true },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/index.vue'),
        name: 'Profile',
        meta: {
          title: 'profile',
          icon: 'user',
          noCache: true
        }
      }
    ]
  }
]
/**
 * 动态路由
 * 需要根据用户角色动态加载的路由
*/
export const asyncRoutes: RouteConfig[] = [
  {
    path: '/permission', // 权限组件
    component: Layout,
    redirect: '/permission/directive',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'page',
        component: () => import(/* webpackChunkName: "permission-page" */ '@/views/permission/page.vue'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import(/* webpackChunkName: "permission-directive" */ '@/views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import(/* webpackChunkName: "permission-role" */ '@/views/permission/role.vue'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/icon', // 图标组件
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "icons" */ '@/views/icons/index.vue'),
        name: 'Icons',
        meta: {
          title: 'icons',
          icon: 'icon',
          noCache: true
        }
      }
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,
  {
    path: '/example', // 综合案例
    component: Layout,
    redirect: '/example/list',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create', // 创建文章
        component: () => import(/* webpackChunkName: "example-create" */ '@/views/example/create.vue'),
        name: 'CreateArticle',
        meta: {
          title: 'createArticle',
          icon: 'edit'
        }
      },
      {
        path: 'edit/:id(\\d+)', // 编辑文章
        component: () => import(/* webpackChunkName: "example-edit" */ '@/views/example/edit.vue'),
        name: 'EditArticle',
        meta: {
          title: 'editArticle',
          noCache: true,
          activeMenu: '/example/list',
          hidden: true
        }
      },
      {
        path: 'list', // 文章列表
        component: () => import(/* webpackChunkName: "example-list" */ '@/views/example/list.vue'),
        name: 'ArticleList',
        meta: {
          title: 'articleList',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/tab', // 分栏选项卡
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "tab" */ '@/views/tab/index.vue'),
        name: 'Tab',
        meta: {
          title: 'tab',
          icon: 'tab'
        }
      }
    ]
  },
  {
    path: '/error', // 401
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401', // 401
        component: () => import(/* webpackChunkName: "error-page-401" */ '@/views/error-page/401.vue'),
        name: 'Page401',
        meta: {
          title: 'page401',
          noCache: true
        }
      },
      {
        path: '404', // 404
        component: () => import(/* webpackChunkName: "error-page-404" */ '@/views/error-page/404.vue'),
        name: 'Page404',
        meta: {
          title: 'page404',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/error-log', // 错误日志
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'log',
        component: () => import(/* webpackChunkName: "error-log" */ '@/views/error-log/index.vue'),
        name: 'ErrorLog',
        meta: {
          title: 'errorLog',
          icon: 'bug'
        }
      }
    ]
  },
  {
    path: '/excel', // excel表格
    component: Layout,
    redirect: '/excel/export-excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel', // 导出excel
        component: () => import(/* webpackChunkName: "export-excel" */ '@/views/excel/export-excel.vue'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      { // 导出已选excel
        path: 'export-selected-excel',
        component: () => import(/* webpackChunkName: "select-excel" */ '@/views/excel/select-excel.vue'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      { // 导出多级表头
        path: 'export-merge-header',
        component: () => import(/* webpackChunkName: "merge-header" */ '@/views/excel/merge-header.vue'),
        name: 'MergeHeader',
        meta: { title: 'mergeHeader' }
      },
      { // 上传excel
        path: 'upload-excel',
        component: () => import(/* webpackChunkName: "upload-excel" */ '@/views/excel/upload-excel.vue'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },
  {
    path: '/zip', // 压缩文件
    component: Layout,
    redirect: '/zip/download',
    meta: {
      title: 'zip',
      icon: 'zip',
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'download',
        component: () => import(/* webpackChunkName: "zip" */ '@/views/zip/index.vue'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },
  {
    path: '/pdf', // PDF组件路由
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "pdf" */ '@/views/pdf/index.vue'),
        name: 'PDF',
        meta: {
          title: 'pdf',
          icon: 'pdf'
        }
      }
    ]
  },
  {
    path: '/pdf-download-example', // PDF文件链接
    component: () => import(/* webpackChunkName: "pdf-download-example" */ '@/views/pdf/download.vue'),
    meta: { hidden: true }
  },
  {
    path: '/theme', // 换肤 主题
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "theme" */ '@/views/theme/index.vue'),
        name: 'Theme',
        meta: {
          title: 'theme',
          icon: 'theme'
        }
      }
    ]
  },
  {
    path: '/clipboard', // 剪切板组件
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "clipboard" */ '@/views/clipboard/index.vue'),
        name: 'Clipboard',
        meta: {
          title: 'clipboard',
          icon: 'clipboard'
        }
      }
    ]
  },
  {
    path: '/i18n', // 国际语言
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "i18n-demo" */ '@/views/i18n-demo/index.vue'),
        name: 'I18n',
        meta: {
          title: 'i18n',
          icon: 'international'
        }
      }
    ]
  },
  { // 外部链接
    path: '/https://github.com/Armour/vue-typescript-admin-template',
    meta: {
      title: 'externalLink',
      icon: 'link'
    }
  },
  { // 匹配其他页面404
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

const createRouter = () => new VueRouter({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
