<template>
  <div>
    <h4>Package Name</h4>
    <img :src="require('~/assets/images/mockup/default-img.svg')" width="160">

    <a-row class="item-wrapper" justify="space-between" type="flex">
      <a-col v-for="(item, itemIndex) in items" :key="itemIndex" span="11">
        <a-row>
          <a-col span="11">
            <img :src="require('~/assets/images/mockup/default-img.svg')" width="40">
          </a-col>
          <a-col span="11">
            <h5>{{ item.name }}</h5>
            <p>{{ item.total }}</p>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { OrderLine } from '~/types/order.type'

export default Vue.extend({
  props: {
    items: {
      type: Array as PropType<OrderLine[]>,
      default: () => []
    }
  }
})
</script>

<style>
.item-wrapper .ant-col {
  margin: 8px 0 0 0;
}

.item-wrapper p {
  margin: 0;
}
</style>
