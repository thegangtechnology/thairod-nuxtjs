<template>
  <div class="container padding-container">
    <div class="text-center mt-6">
      <img :src="require('@/assets/icons/icon-check.svg')" alt="icon check" class="ma-auto">
      <div class="text__title mb-8">
        ยืนยันการสั่งจ่ายเรียบร้อย
      </div>
    </div>
    <CardPatientDetail :patient-detail="patient" />
    <a-divider />

    <div class="text__subtitle  mb-3">
      รายละเอียดสินค้า
    </div>
    <a-row v-for="(item,i) in doctorOrder" :key="i" class="item__list">
      <a-col :span="18">
        {{ item.name }}
      </a-col>
      <a-col :span="6" class="text-right">
        {{ item.quantity }} {{ item.unit }}
      </a-col>
    </a-row>
    <a-divider />
    <div class="text__subtitle mb-3">
      URL สำหรับการยืนยันที่อยู่รับสินค้า
    </div>
    <a-input
      id="copyPatientHash"
      ref="textToCopy"
      :value="`${url}/checkout/?patient=${patientLinkHash}`"
      placeholder="Link URL"
      class="input-round input-disabled"
    />
    <div class="button-container">
      <a-row>
        <a-col :span="24">
          <a-button
            type="primary"
            block
            shape="round"
            size="large"
            :style="{
              backgroundColor: '#F9B7B7',
              color: '#000000',
              borderColor: '#ffc1c1',
            }"
            @click="copyLink"
          >
            คัดลอก URL
            <a-icon type="copy" />
          </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CardPatientDetail from '~/components/CardPatientDetail.vue'
import { Patient } from '~/types/patient.type'
import DoctorModule from '~/store/doctor.module'
import { OrderItem } from '~/types/order.type'

export default Vue.extend({
  components: {
    CardPatientDetail
  },
  layout: 'product-layout',
  data () {
    return {
      url: location.host
    }
  },
  computed: {
    patient (): Patient {
      return DoctorModule.patient
    },
    hash (): string {
      return this.$route.query.doctor as string
    },
    patientLinkHash (): string {
      return `${DoctorModule.patientLinkHash}`
    },
    doctorOrder (): OrderItem[] {
      return DoctorModule.doctorOrder
    }
  },
  // async mounted () {
  //   await DoctorModule.getDoctorOrder({ hash: this.hash })
  // },
  methods: {
    copyLink (): void {
      const copyText = document.getElementById('copyPatientHash') as HTMLInputElement
      copyText.select()
      document.execCommand('copy')
      sessionStorage.removeItem('doc-or-storage')
      this.$message.success('Copied', 1)
    }
  }
})
</script>

<style scoped>
.padding-container{
  padding-bottom: 80px;
}
.text__title {
  font-size: 24px;
  color: #000000;
  margin-top: 14px;
}

.text__subtitle {
  font-size: 16px;
  color: #909090;
  line-height: normal;
}
.button-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  padding: 16px;
}
.item__list{
  font-weight:bold;
  font-size: 18px;
  color: #000000;
}
.input-disabled{
  background-color: #EEEFF6;
  border-color: #EEEFF6;
  pointer-events: none;
}
</style>
