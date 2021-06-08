<template>
  <div id="micro-application-container" />
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import { init, MICRO_APPLICATIONS } from '@/utils/micro'

export default defineComponent({
  setup() {
    nextTick().then(() => {
      init(MICRO_APPLICATIONS)
    })
  }
})
</script>
