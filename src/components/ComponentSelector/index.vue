<template>
  <a-modal
    :visible="visible"
    width="1000px"
    title="Component Selector"
    :footer="null"
  >
    <div class="components-overview">
      <components-overview-group @select="onSelectComponent" />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { Modal } from 'ant-design-vue'
import ComponentsOverviewGroup from './components/ComponentsOverviewGroup.vue'

export default defineComponent({
  name: 'ComponentSelector',

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  components: {
    [Modal.name]: Modal,
    [ComponentsOverviewGroup.name]: ComponentsOverviewGroup
  },

  setup(props, { emit }) {
    const onSelectComponent = (options: {
      name: string
      innerHTML?: string
      props?: { [key: string]: any }
    }) => {
      emit('confirm', { key: uuidv4(), ...options })
    }

    return { onSelectComponent }
  }
})
</script>

<style lang="less" scoped>
.components-overview {
  height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
