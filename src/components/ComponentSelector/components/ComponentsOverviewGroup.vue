<template>
  <div>
    <template v-for="group in componentGroups" :key="group.group">
      <div class="components-overview-group-title">{{ group.group }}</div>
      <a-row :gutter="[16, 16]">
        <a-col v-for="(item, index) in group.components" :key="index" :span="6">
          <a-card
            hoverable
            size="small"
            :title="item.name"
            @click="$emit('select', JSON.parse(JSON.stringify(item)))"
          >
            <div class="components-overview-img">
              <img :src="item.image" :alt="item.name" />
            </div>
          </a-card>
        </a-col>
      </a-row>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Row, Col, Card } from 'ant-design-vue'
import { componentGroups } from '../constants'

export default defineComponent({
  name: 'ComponentsOverviewGroup',

  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card
  },

  setup() {
    return { componentGroups }
  }
})
</script>

<style lang="less" scoped>
.components-overview-group-title {
  font-weight: 500;
  margin: 16px 0;
  font-size: 24px;
  line-height: 32px;

  &:first-child {
    margin-top: 0;
  }
}

.components-overview-img {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 152px;

  img {
    max-width: calc(100% - 32px);
    vertical-align: middle;
    border-style: none;
  }
}
</style>
