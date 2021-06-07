import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    name: 'auth',
    redirect: '/auth/login',
    component: AuthLayout,
    children: [
      {
        path: '/auth/login',
        name: 'auth-login',
        component: () => import('@/views/auth/login/index.vue')
      }
    ]
  }

  // {
  //   path: '/',
  //   name: 'index',
  //   component: BasicLayout,
  //   children: [
  //     {
  //       path: '/cloudresourcecenter',
  //       name: 'cloudresourcecenter',
  //       component: MicroRouterView,
  //       children: [
  //         {
  //           path: '/cloudresourcecenter/resourceoverview',
  //           component: RouteView
  //         }
  //       ]
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes
})

export default router
