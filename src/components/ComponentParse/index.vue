<template>
  <component v-bind="value.props" :is="`A${value.name}`">
    <span>{{ value.innerHTML }}</span>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'

export default defineComponent({
  name: 'ComponentParse',

  components: {
    [Button.name]: Button
  },

  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  }
})
</script>
