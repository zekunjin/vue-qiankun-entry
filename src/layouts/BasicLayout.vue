<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Layout } from 'ant-design-vue'

export default defineComponent({
  components: {
    [Layout.name]: Layout,
    [Layout.Sider.name]: Layout.Sider
  },

  setup() {
    const collapsed = ref(false)
    return { collapsed }
  }
})
</script>
