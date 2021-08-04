<template>
  <div>
    <a-row class="item-wrapper" justify="space-between" type="flex">
      <a-col
        v-for="(item, itemIndex) in items"
        :key="itemIndex"
        :md="12"
        span="24"
      >
        <a-row>
          <a-col :span="11" offset="1">
            <p class="item-name">
              <strong>
                {{ itemIndex + 1 }}. {{ item.name }}
              </strong>
            </p>
          </a-col>
          <a-col :span="11">
            <p class="item-total">
              <strong>
                {{ item.quantity }}
                <span style="text-transform: capitalize;">
                  {{ item.unit }}
                </span>
              </strong>
            </p>
          </a-col>

          <a-col :span="24">
            <p class="item-description">
              {{ item.description }}
            </p>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script lang='ts'>
import Vue, { PropType } from 'vue'
import { OrderItem } from '~/types/order.type'

export default Vue.extend({
  props: {
    items: {
      type: Array as PropType<OrderItem[]>,
      default: () => []
    }
  }
})
</script>

<style scoped lang='less'>
.item-wrapper {
  p {
    margin: 0;
  }
}

.item-name {
  font-size: 22px;
}

.item-total {
  font-size: 22px;
  text-align: right;
}

.item-description {
  padding-left: 2rem;
}
</style>
