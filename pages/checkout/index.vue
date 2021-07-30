<template>
  <div class="order-content-wrapper">
    <a-row justify="center" type="flex">
      <a-col :md="12" :span="24">
        <p>ชื่อ - นามสกุล</p>
        <a-input :value="fullName" disabled />
      </a-col>

      <a-col :md="12" :span="24">
        <p>เบอร์โทร</p>
        <a-input v-model="form.telephone" />
      </a-col>

      <a-col :span="24">
        <p>ที่อยู่</p>
        <a-textarea v-model="form.address" :rows="3" />
      </a-col>

      <a-col :md="12" :span="24">
        <p>จังหวัด</p>
        <a-select
          class="select-custom"
          style="width: 100%"
        />
      </a-col>

      <a-col :md="12" :span="24">
        <p>เขต/อำเภอ</p>
        <a-select
          style="width: 100%"
        />
      </a-col>

      <a-col :md="12" :span="24">
        <p>แขวง/ตำบล</p>
        <a-select
          style="width: 100%"
        />
      </a-col>

      <a-col :md="12" :span="24">
        <p>รหัสไปรษณีย์</p>
        <a-input v-model="form.zipcode" />
      </a-col>

      <a-col :span="24">
        <p>แผนที่</p>
        MAP
      </a-col>

      <a-col :span="24">
        <p>จุดสังเกต</p>
        <a-textarea v-model="form.optional" :rows="3" />
      </a-col>
    </a-row>

    <a-row class="button-group" type="flex">
      <a-col span="12">
        <secondary-button :on-click="clickBack" :text="'กลับ'" />
      </a-col>
      <a-col span="12">
        <primary-button :on-click="goToOrderConfirmation" :text="'ต่อไป'" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CheckoutModule from '~/store/checkout.module'
import { Order } from '~/types/order.type'
import CommonModule from '~/store/common.module'
import PrimaryButton from '~/components/procurement/buttons/PrimaryButton.vue'
import SecondaryButton from '~/components/procurement/buttons/SecondaryButton.vue'

export default Vue.extend({
  components: {
    PrimaryButton,
    SecondaryButton
  },
  layout: 'mobile-empty',
  data () {
    return {
      form: {
        firstName: '',
        lastName: ''
      }
    }
  },
  computed: {
    order (): Order {
      return CheckoutModule.order
    },
    fullName (): string {
      return `${this.form.firstName} ${this.form.lastName}`
    }
  },
  async mounted () {
    CommonModule.setHeaderTitle({ header: 'กรุณาตรวจสอบข้อมูล' })
    await CheckoutModule.getOrder({ id: 1 })
    this.form = this.order.address
  },
  methods: {
    goToOrderConfirmation (): void {
      this.$router.push('/checkout/checkout-confirmation')
    },
    clickBack (): void {
      //  back method
    }
  }
})
</script>

<style scoped>
.order-content-wrapper .ant-col {
  padding: 10px 6px;
}
</style>
