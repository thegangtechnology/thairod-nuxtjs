<template>
  <div>
    <a-row class="address-wrapper" justify="space-between" type="flex">
      <a-col span="4">
        <img :src="require('~/assets/icons/user.svg')" alt="user-icon">
      </a-col>
      <a-col class="value-detail" span="20">
        {{ detail.firstName }} {{ detail.lastName }}
      </a-col>

      <a-col span="4">
        <img :src="require('~/assets/icons/phone.svg')" alt="telephone-icon">
      </a-col>
      <a-col class="value-detail" span="20">
        {{ detail.telephone }}
      </a-col>

      <a-col span="4">
        <img :src="require('~/assets/icons/pin.svg')" alt="pin-icon">
      </a-col>
      <a-col class="value-detail" span="20">
        {{ detail.address }}
      </a-col>

      <a-col span="24">
        MAP
      </a-col>

      <a-col class="value-detail" span="20">
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
</style>
