<template>
  <div class="page-container">
    {{ componentConfig }}
    <component-parse :value="componentConfig" @select="handleSelectTarget" />
  </div>

  <component-selector
    :visible="visible"
    @cancel="toggleVisible"
    @confirm="handleConfirmComponent"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue'
import { Button } from 'ant-design-vue'
import ComponentSelector from '@/components/ComponentSelector/index.vue'

export interface IComponent {
  key: string
  name: string
  innerHTML?: string
  style?: { [key: string]: string }
  props?: { [key: string]: any }
  header?: IComponent[]
  footer?: IComponent[]
  sider?: IComponent[]
  container?: IComponent[]
  [key: string]: any
}

export default defineComponent({
  components: {
    [Button.name]: Button,
    [ComponentSelector.name]: ComponentSelector
  },

  setup() {
    const componentConfig: IComponent = reactive({
      key: '',
      name: '',
      innerHTML: '',
      style: {},
      props: {},
      header: undefined,
      footer: undefined,
      sider: undefined,
      container: undefined
    })
    const selectedContainer = reactive({ key: '', layout: '', index: -1 })
    const visible: Ref<boolean> = ref(false)

    const toggleVisible = () => {
      visible.value = !visible.value
    }

    const handleSelectTarget = (options?: {
      component: IComponent
      layout: string
      index: number
    }) => {
      if (options) {
        selectedContainer.key = options.component.key
        selectedContainer.layout = options.layout
        selectedContainer.index = options.index
      }
      toggleVisible()
    }

    const getComponentByKey = (resource: IComponent[], key: string) => {
      let result: IComponent | undefined = resource.find(
        (item) => item.key === key
      )
      if (!result) {
        for (const item of resource) {
          if (item.container && item.container.length > 0) {
            getComponentByKey(item.container, key)
          }
        }
      }

      return result
    }

    const handleConfirmComponent = (component: IComponent) => {
      if (!selectedContainer.key) {
        componentConfig.key = component.key
        componentConfig.name = component.name
        componentConfig.innerHTML = component.innerHTML || ''
        componentConfig.props = component.props || {}
        componentConfig.container = component.container || []
      } else {
        const resource = [componentConfig]
        const target = getComponentByKey(resource, selectedContainer.key)
        if (target) {
          const { layout, index } = selectedContainer
          const current = target[layout][index]
          current.key = component.key
          current.name = component.name
          current.innerHTML = component.innerHTML || ''
          current.props = component.props || {}
          current.container = component.container || []
        }
      }
      toggleVisible()
    }

    return {
      componentConfig,
      selectedContainer,
      visible,
      toggleVisible,
      handleSelectTarget,
      handleConfirmComponent
    }
  }
})
</script>

<style lang="less" scoped>
.page-container {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}

.create-page-component {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
