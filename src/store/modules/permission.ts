import { Commit } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import AjaxAuthService from '@/services/ajax/auth'
import BasicLayout from '@/layouts/BasicLayout.vue'
import MicroRouterView from '@/layouts/MicroRouterView.vue'
import RouteView from '@/layouts/RouteView.vue'

export interface IPermissionState {
  dynamicRoutes: RouteRecordRaw[]
  dynamicMenus: IDynamicMenu[]
}

export interface IDynamicMenu {
  title_zh: string
  title_en: string
  icon: string
  children?: IDynamicMenu[]
}

export interface IDynamicRoute {
  id: string
  name: string
  path: string
  component: string
  meta?: { [key: string]: string | boolean | number }
  children?: IDynamicRoute[]
  [key: string]: any
}

export const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'index',
  component: BasicLayout,
  children: []
}

export const getDynamicRecords = (
  token?: string
): Promise<{ routes: RouteRecordRaw[]; menus: IDynamicMenu[] }> => {
  return new Promise((resolve) => {
    AjaxAuthService.getMenu(token).then(({ data }) => {
      data.push({
        path: '/vue',
        children: [{ path: '/vue/about' }]
      })
      const { routes, menus } = formatDynamicRecords(data)
      rootRoute.children = routes
      resolve({ routes: [rootRoute], menus })
    })
  })
}

export const formatDynamicRecords = (
  routes: IDynamicRoute[]
): { routes: RouteRecordRaw[]; menus: IDynamicMenu[] } => {
  const dynamicRoutes: RouteRecordRaw[] = []
  const dynamicMenus: IDynamicMenu[] = []

  const generateRecords = (
    targetRoutes: RouteRecordRaw[],
    targetMenus: IDynamicMenu[],
    routes: IDynamicRoute[],
    depth = 0
  ) => {
    routes.forEach((route, index) => {
      targetRoutes.push({
        path: route.path,
        component: depth > 0 ? RouteView : MicroRouterView,
        children: []
      })

      if (route.meta && !route.meta.hidden) {
        targetMenus.push({
          title_en: route.meta ? (route.meta.titleEN as string) : '',
          title_zh: route.meta ? (route.meta.titleZH as string) : '',
          icon: route.meta ? (route.meta.icon as string) : '',
          children: []
        })
      }

      if (route.children && route.children.length > 0) {
        generateRecords(
          targetRoutes[index].children as RouteRecordRaw[],
          (targetMenus[index]?.children as IDynamicMenu[]) || [],
          route.children,
          depth + 1
        )
      }
    })
  }

  generateRecords(dynamicRoutes, dynamicMenus, routes)

  return { routes: dynamicRoutes, menus: dynamicMenus }
}

const permission = {
  namespaced: true,

  state: {
    dynamicRoutes: []
  },

  mutations: {
    SET_DYNAMIC_ROUTES(
      state: IPermissionState,
      dynamicRoutes: RouteRecordRaw[]
    ): void {
      state.dynamicRoutes = dynamicRoutes
    },

    SET_DYNAMIC_MENUS(
      state: IPermissionState,
      dynamicMenus: IDynamicMenu[]
    ): void {
      state.dynamicMenus = dynamicMenus
    }
  },

  actions: {
    GenerateRoutes(
      { commit }: { commit: Commit },
      token?: string
    ): Promise<RouteRecordRaw[]> {
      return new Promise((resolve, reject) => {
        getDynamicRecords(token)
          .then(({ routes, menus }) => {
            commit('SET_DYNAMIC_ROUTES', routes)
            commit('SET_DYNAMIC_MENUS', menus)
            resolve(routes)
          })
          .catch(() => {
            reject()
          })
      })
    }
  }
}

export default permission
