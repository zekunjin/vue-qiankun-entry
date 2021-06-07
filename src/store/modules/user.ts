import { Commit } from 'vuex'
import AjaxAuthService, { ILoginParams } from '@/services/ajax/auth'
import LocalAuthService from '@/services/local/auth'

export interface IUserState {
  token: string
  username: string
  roles: Array<string>
}

const user = {
  namespaced: true,

  state: {
    token: LocalAuthService.getToken() || '',
    username: '',
    roles: []
  },

  mutations: {
    SET_TOKEN(state: IUserState, token: string): void {
      debugger
      state.token = token
    },
    SET_USERNAME(state: IUserState, username: string): void {
      state.username = username
    },
    SET_ROLES(state: IUserState, roles: Array<string>): void {
      state.roles = roles
    }
  },

  actions: {
    Login({ commit }: { commit: Commit }, params: ILoginParams): Promise<void> {
      return new Promise((resolve, reject) => {
        AjaxAuthService.login(params)
          .then(({ data }) => {
            LocalAuthService.setToken(data.token)
            commit('SET_TOKEN', data.token)
            commit('SET_USERNAME', params.user_name)
            commit('SET_ROLES', data.func_list)
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },

    Logout({ commit }: { commit: Commit }): Promise<void> {
      return new Promise((resolve) => {
        LocalAuthService.removeToken()
        commit('SET_TOKEN', '')
        commit('SET_USERNAME', '')
        commit('SET_ROLES', [])
        resolve()
      })
    }
  }
}

export default user
