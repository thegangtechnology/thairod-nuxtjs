<template>
  <div>
    <a-alert v-if="isSubmit" class="alert-box" message="Successfully Submit" type="success" />

    <h3>กล่องสีเขียว</h3>
    <img :src="require('~/assets/images/mockup/default-checkout-green.svg')" alt="package-image">

    <h3>รายละเอียดผู้รับการรักษา:</h3>
    <AddressOrder :detail="order.address" />

    <a-divider />

    <h3>รายละเอียดสินค้า:</h3>
    <ItemOrder :items="order.orderLines" />

    <a-row class="button-group" type="flex">
      <a-col span="12">
        <secondary-button :on-click="backToAddress" :text="'ยกเลิก'" />
      </a-col>
      <a-col span="12">
        <primary-button :on-click="submitCheckout" :text="'ยืนยัน'" />
      </a-col>
    </a-row>

    <a-modal
      v-model="isSubmit"
      :closable="false"
      :footer="null"
      :style="{width: '130px'}"
      class="modal"
    >
      <div class="modal-content">
        <img :src="require('~/assets/icons/check.svg')" alt='check-icon' class='circle-icon'>
        <h3>บันทึกข้อมูลเรียบร้อย</h3>
        <p>
          ได้ทำการยืนยันที่อยู่ของท่านเรียบร้อย
          กรุณารอรับกล่องช่วยเหลือของท่าน
        </p>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ItemOrder from '~/components/checkout/ItemCheckout.vue'
import AddressOrder from '~/components/checkout/AddressCheckout.vue'
import PrimaryButton from '~/components/procurement/buttons/PrimaryButton.vue'
import SecondaryButton from '~/components/procurement/buttons/SecondaryButton.vue'
import CheckoutModule from '~/store/checkout.module'
import { Order } from '~/types/order.type'
import CommonModule from '~/store/common.module'

export default Vue.extend({
  components: {
    ItemOrder,
    AddressOrder,
    PrimaryButton,
    SecondaryButton
  },
  layout: 'mobile-empty',
  data () {
    return {
      isSubmit: false
    }
  },
  computed: {
    order (): Order {
      return CheckoutModule.order
    }
  },
  async mounted () {
    CommonModule.setHeaderTitle({ header: 'กรุณาตรวจสอบข้อมูล' })
    await CheckoutModule.getOrder({ id: 1 })
  },
  methods: {
    backToAddress (): void {
      this.$router.push('/checkout')
    },

    submitCheckout (): void {
      this.isSubmit = true
      const second = 5 * 1000
      // hide modal box
      setTimeout(() => {
        this.isSubmit = false
      }, second)
    }
  }
})
</script>

<style scoped>
.button-wrapper {
  margin: 20px 0;
}

.ant-divider {
  height: 2px;
}

h3 {
  margin: 10px 0;
}

.modal-content {
  text-align: center;
  margin: 40px;
}

.circle-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #99E276;
  padding: 10px;
}
</style>

<style>
.alert-box .ant-alert-message {
  color: white;
}
</style>
