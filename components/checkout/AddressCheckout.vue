<template>
  <div>
    <a-row class="address-wrapper" justify="space-between" type="flex">
      <a-col :md="2" span="4">
        <img :src="require('~/assets/icons/user.svg')" alt="user-icon">
      </a-col>
      <a-col class="value-detail" :md="22" span="20">
        {{ detail.name }}
      </a-col>

      <a-col :md="2" span="4">
        <img :src="require('~/assets/icons/phone.svg')" alt="telephone-icon">
      </a-col>
      <a-col class="value-detail" :md="22" span="20">
        {{ detail.phoneNumber }}
      </a-col>

      <a-col :md="2" span="4">
        <img :src="require('~/assets/icons/pin.svg')" alt="pin-icon">
      </a-col>
      <a-col class="value-detail" :md="22" span="20">
        {{ fullAdderss }}
      </a-col>

      <!--      TODO: Add map later-->
      <!--      <a-col span='24'>-->
      <!--        MAP-->
      <!--      </a-col>-->

      <a-col class="value-detail" span="20">
        {{ detail.note }}
      </a-col>
    </a-row>
  </div>
</template>

<script lang='ts'>
import Vue, { PropType } from 'vue'
import { PatientInfo } from '~/types/order.type'

export default Vue.extend({
  props: {
    detail: {
      type: Object as PropType<PatientInfo>,
      default: () => {
        return {
          name: '',
          phoneNumber: '',
          street: '',
          province: '',
          district: '',
          subDistrict: '',
          zipcode: '',
          note: ''
        }
      }
    }
  },
  computed: {
    fullAdderss (): string {
      return `${this.detail.street} ${this.detail.subDistrict} ${this.detail.district} ${this.detail.province} ${this.detail.zipcode}`
    }
  }
})
</script>

<style>
.address-wrapper .ant-col {
  margin: 8px 0 0 0;
}
</style>
