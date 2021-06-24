<template>
  <a-row :gutter="gutter">
    <a-col
      v-for="(item, index) in parent.container"
      :key="item.key"
      :span="span"
    >
      <component-parse :value="item" @select="handleSelectTarget(index)" />
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Row, Col } from 'ant-design-vue'

export default defineComponent({
  name: 'AGrid',

  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },

  props: {
    parent: {
      type: Object,
      default: () => ({})
    },
    gutter: {
      type: Number || Object || Array,
      default: 0
    },
    span: {
      type: Number,
      default: 24
    }
  },

  setup(props, { emit }) {
    const handleSelectTarget = (index: number): void => {
      emit('select', { component: props.parent, layout: 'container', index })
    }

    return { handleSelectTarget }
  }
})
</script>
