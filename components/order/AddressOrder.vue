<template>
  <div>
    <a-row class="address-wrapper" justify="space-between" type="flex">
      <a-col span="8">
        Name:
      </a-col>
      <a-col class="value-detail" span="16">
        {{ detail.firstName }} {{ detail.lastName }}
      </a-col>

      <a-col span="8">
        Phone:
      </a-col>
      <a-col class="value-detail" span="16">
        {{ detail.telephone }}
      </a-col>

      <a-col span="8">
        Address:
      </a-col>
      <a-col class="value-detail" span="16">
        {{ detail.address }}
      </a-col>

      <a-col span="8">
        Optional:
      </a-col>
      <a-col class="value-detail" span="16">
        {{ detail.optional }}
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Address } from '~/types/order.type'

export default Vue.extend({
  props: {
    detail: {
      type: Object as PropType<Address>,
      default: () => {
        return {}
      }
    }
  }
})
</script>

<style>
.address-wrapper .ant-col {
  margin: 8px 0 0 0;
}

.value-detail {
  font-weight: bold;
}
</style>
