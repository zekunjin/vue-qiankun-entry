import { App } from 'vue'
import ComponentParse from '@/components/ComponentParse/index.vue'

export default {
  install(app: App<Element>): void {
    app.component(ComponentParse.name, ComponentParse)
  }
}
