import { RouteRecordRaw } from 'vue-router'
import router from './router'
import store from './store'
import LocalAuthService from './services/local/auth'

const whiteList = ['auth-login', 'generator']

router.beforeEach((to, from, next) => {
  const token = LocalAuthService.getToken()
  if (token) {
    if (to.name === 'auth-login') {
      next({ path: '/' })
    } else {
      if (store.getters.dynamicRoutes.length > 0) {
        next()
      } else {
        store
          .dispatch('permission/GenerateRoutes')
          .then((asyncRoutes) => {
            asyncRoutes.forEach((route: RouteRecordRaw) => {
              router.addRoute(route)
            })
            next({ ...to, replace: true })
          })
          .catch(() => {
            store.dispatch('user/Logout').then(() => {
              next({ name: 'auth-login', query: { redirect: to.fullPath } })
            })
          })
      }
    }
  } else {
    if (whiteList.includes(to.name as string)) {
      next()
    } else {
      next({ name: 'auth-login', query: { redirect: to.fullPath } })
    }
  }
})
