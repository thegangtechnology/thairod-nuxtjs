<template>
  <div>
    <a-row class="item-wrapper" justify="space-between" type="flex">
      <a-col
        v-for="(item, itemIndex) in items"
        :key="itemIndex"
        :md="12"
        span="24"
      >
        <a-row type="flex">
          <a-col flex="100px">
            <img :src="require('~/assets/images/mockup/default-checkout-green.svg')" height="60" width="60">
          </a-col>
          <a-col :span="11">
            <p class="item-name">
              {{ item.name }}
            </p>
            <p class="item-total">
              {{ item.total }} กล่อง
            </p>
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
.item-wrapper p {
  margin: 0;
}

.item-name {
  font-size: 22px;
}

.item-total {
  font-weight: bold;
}
</style>
