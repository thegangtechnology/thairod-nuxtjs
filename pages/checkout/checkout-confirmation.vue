<template>
  <div>
    <h3>รายละเอียดผู้รับการรักษา:</h3>
    <AddressOrder :detail='patientInfo' />

    <a-divider />

    <h3>รายละเอียดสินค้า:</h3>
    <ItemOrder :items='orderItems' />

    <a-row class='button-group' type='flex'>
      <a-col span='12'>
        <secondary-button :on-click='backToAddress' :text="'ยกเลิก'" size='default' />
      </a-col>
      <a-col span='12'>
        <primary-button :on-click='submitCheckout' :text="'ยืนยัน'" size='default' />
      </a-col>
    </a-row>

    <a-modal
      v-model='isSubmit'
      :closable='false'
      :footer='null'
      :style="{width: '130px'}"
      class='modal'
    >
      <div class='modal-content'>
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

<script lang='ts'>
import Vue from 'vue'
import ItemOrder from '~/components/checkout/ItemCheckout.vue'
import AddressOrder from '~/components/checkout/AddressCheckout.vue'
import PrimaryButton from '~/components/procurement/buttons/PrimaryButton.vue'
import SecondaryButton from '~/components/procurement/buttons/SecondaryButton.vue'
import CheckoutModule from '~/store/checkout.module'
import { PatientInfo, OrderItem } from '~/types/order.type'
import CommonModule from '~/store/common.module'

export default Vue.extend({
  components: {
    ItemOrder,
    AddressOrder,
    PrimaryButton,
    SecondaryButton
  },
  layout: 'mobile-empty',
  data() {
    return {
      isSubmit: false
    }
  },
  computed: {
    patientInfo(): PatientInfo {
      return CheckoutModule.patient
    },
    patientHash(): string {
      return this.$route.query.patient as string
    },
    orderItems(): OrderItem[] {
      return CheckoutModule.orderItems
    }
  },
  async mounted() {
    CommonModule.setHeaderTitle({ header: 'กรุณาตรวจสอบข้อมูล' })
    await CheckoutModule.getPatientOrder({ patientHash: this.patientHash })
  },
  methods: {
    backToAddress(): void {
      this.$router.push(`/checkout/?patient=${this.patientHash}`)
    },

    async submitCheckout(): Promise<void> {
      const second = 5 * 1000
      try {
        await CheckoutModule.patientCheckout({ patientHash: this.patientHash })
        this.isSubmit = true
        // hide modal box
      } catch (e) {
      }
      setTimeout(() => {
        this.isSubmit = false
      }, second)
    }
  }
})
</script>

<style scoped lang='less'>
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
