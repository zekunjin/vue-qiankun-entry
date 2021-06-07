<template>
  <a-layout>
    <!-- <a-layout-sider @collapsed="collapsed" :trigger="null" collapsible>
    </a-layout-sider> -->
    <a-layout-content>
      <router-view />
    </a-layout-content>
  </a-layout>
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
