import request from '@/utils/request'
import { ACCESS_TOKEN } from '@/constants'
import LocalAuthService from '@/services/local/auth'

export const LOGIN = '/backend/api/v1/auth/login'
export const USER_MENU = '/backend/api/v1/auth/userMenu'

export interface ILoginParams {
  user_type: number
  user_name: string
  passwd: string
}

export default class AjaxAuthService {
  static login(data: ILoginParams): Promise<any> {
    return request({
      url: LOGIN,
      method: 'post',
      data
    })
  }

  static getMenu(token?: string): Promise<any> {
    return request({
      url: USER_MENU,
      method: 'get',
      headers: {
        [ACCESS_TOKEN]: token || LocalAuthService.getToken()
      }
    })
  }
}
