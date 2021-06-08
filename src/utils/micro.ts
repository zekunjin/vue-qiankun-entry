import { registerMicroApps, start, initGlobalState } from 'qiankun'
import LocalAuthService from '@/services/local/auth'

export interface IApplication {
  name: string
  entry: string
  container: string
  activeRule: string
  props?: { [key: string]: any }
}

export const MICRO_APPLICATIONS: IApplication[] = [
  {
    name: 'micro-application-vue',
    entry: '//localhost:8081',
    container: '#micro-application-container',
    activeRule: '/vue'
  },
  {
    name: 'cloudresourcecenter',
    entry: '//localhost:9011/cloudresourcecenter1/',
    container: '#micro-application-container',
    activeRule: '/cloudresourcecenter',
    props: { data: { token: LocalAuthService.getToken() } }
  }
]

export const init = (applications: IApplication[]): void => {
  const state = {}

  const actions = initGlobalState()
  actions.setGlobalState(state)
  actions.offGlobalStateChange()

  registerMicroApps(
    applications.map((item) => {
      const { props = {} } = item
      item.props = { ...props, actions }
      return item
    })
  )

  start()
}
