import { RouteRecordRaw } from 'vue-router'
import { IRootState } from './index'
import { IDynamicMenu } from './modules/permission'

export default {
  dynamicRoutes: (state: IRootState): RouteRecordRaw[] =>
    state.permission.dynamicRoutes,
  dynamicMenus: (state: IRootState): IDynamicMenu[] =>
    state.permission.dynamicMenus
}
