<template>
  <div class="component-target-layout">
    <div class="component-target-container" @click="$emit('select')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ComponentTarget'
})
</script>

<style lang="less" scoped>
.component-target-layout {
  width: 100%;
  height: 100%;
  padding: 16px;

  .component-target-container {
    width: 100%;
    height: 100%;
    background-color: #fafafa;
    border: 1px dashed #d9d9d9;
    border-radius: 2px;
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 0;
  }
}
</style>
