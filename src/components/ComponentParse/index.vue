<template>
  <component
    v-if="value.key"
    v-bind="value.props"
    :parent="value"
    :is="`A${value.name}`"
  >
    <span>{{ value.innerHTML }}</span>
  </component>
  <component-target v-else />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import { Button, Col } from 'ant-design-vue'
import ComponentTarget from '@/components/ComponentTarget/index.vue'

export default defineComponent({
  name: 'ComponentParse',

  components: {
    [Button.name]: Button,
    [Col.name]: Col,
    [ComponentTarget.name]: ComponentTarget,
    AGrid: defineAsyncComponent(() => import('./components/Grid/index.vue'))
  },

  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  }
})
</script>
