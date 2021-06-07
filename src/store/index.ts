import { createStore } from 'vuex'
import getters from './getters'
import user, { IUserState } from './modules/user'
import permission, { IPermissionState } from './modules/permission'

export interface IRootState {
  user: IUserState
  permission: IPermissionState
}

const store = createStore({
  modules: { user, permission },
  getters
})

export default store
