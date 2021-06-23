<template>
  <div class="page-container">
    <component-parse :value="componentConfig" />
  </div>

  <div class="create-page-component">
    <a-button type="primary" shape="circle" size="large" @click="toggleVisible">
      <template #icon>
        <plus-outlined />
      </template>
    </a-button>
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
import { PlusOutlined } from '@ant-design/icons-vue'
import ComponentSelector from '@/components/ComponentSelector/index.vue'
import ComponentParse from '@/components/ComponentParse/index.vue'

export interface IComponent {
  key: string
  name: string
  innerHTML?: string
  style?: { [key: string]: string }
  props?: { [key: string]: any }
  header?: IComponent
  footer?: IComponent
  sider?: IComponent
  container?: IComponent
}

export default defineComponent({
  components: {
    [Button.name]: Button,
    [PlusOutlined.name]: PlusOutlined,
    [ComponentSelector.name]: ComponentSelector,
    [ComponentParse.name]: ComponentParse
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
    const selectedContainer = reactive({})
    const visible: Ref<boolean> = ref(false)

    const toggleVisible = () => {
      visible.value = !visible.value
    }

    const handleConfirmComponent = (component: {
      key: string
      name: string
      innerHTML?: string
      props?: { [key: string]: any }
    }) => {
      if (!componentConfig.key) {
        componentConfig.key = component.key
        componentConfig.name = component.name
        componentConfig.innerHTML = component.innerHTML || ''
        componentConfig.props = component.props || {}
      }
      toggleVisible()
    }

    return {
      componentConfig,
      selectedContainer,
      visible,
      toggleVisible,
      handleConfirmComponent
    }
  }
})
</script>

<style lang="less" scoped>
.drag-target-container {
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
}

.create-page-component {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
