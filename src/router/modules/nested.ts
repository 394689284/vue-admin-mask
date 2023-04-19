/*
 * @FilePath: \vue-typescript-admin-template\src\router\modules\nested.ts
 * @Author: maskMan
 * @Date: 2023-04-09 20:16:27
 * @LastEditTime: 2023-04-18 16:35:07
 * @Reference: 引用方 src\router\index.ts
 * @Descripttion: 说明 嵌套路由页面
 */

import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const nestedRoutes: RouteConfig = {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1', // 菜单1
  name: 'Nested',
  meta: {
    title: 'nested',
    icon: 'nested'
  },
  children: [
    {
      path: 'menu1',
      component: () => import(/* webpackChunkName: "menu1" */ '@/views/nested/menu1/index.vue'),
      redirect: '/nested/menu1/menu1-1',
      name: 'Menu1',
      meta: { title: 'menu1' },
      children: [
        {
          path: 'menu1-1', // 默认路由
          component: () => import(/* webpackChunkName: "menu1-1" */ '@/views/nested/menu1/menu1-1/index.vue'),
          name: 'Menu1-1',
          meta: { title: 'menu1-1' }
        },
        {
          path: 'menu1-2',
          component: () => import(/* webpackChunkName: "menu1-2" */ '@/views/nested/menu1/menu1-2/index.vue'),
          redirect: '/nested/menu1/menu1-2/menu1-2-1',
          name: 'Menu1-2',
          meta: { title: 'menu1-2' },
          children: [
            {
              path: 'menu1-2-1',
              component: () => import(/* webpackChunkName: "menu1-2-1" */ '@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
              name: 'Menu1-2-1',
              meta: { title: 'menu1-2-1' }
            },
            {
              path: 'menu1-2-2',
              component: () => import(/* webpackChunkName: "menu1-2-2" */ '@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
              name: 'Menu1-2-2',
              meta: { title: 'menu1-2-2' }
            }
          ]
        },
        {
          path: 'menu1-3',
          component: () => import(/* webpackChunkName: "menu1-3" */ '@/views/nested/menu1/menu1-3/index.vue'),
          name: 'Menu1-3',
          meta: { title: 'menu1-3' }
        }
      ]
    },
    {
      path: 'menu2', // 无子路由
      component: () => import(/* webpackChunkName: "menu2" */ '@/views/nested/menu2/index.vue'),
      name: 'Menu2',
      meta: { title: 'menu2' }
    }
  ]
}

export default nestedRoutes
