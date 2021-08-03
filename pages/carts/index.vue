<template>
  <div class="container">
    <CardPatientDetail :patient-detail="patient" />
    <a-divider class="my-3" />
    <div class="carts-card__container">
      <a-row class="mb-6">
        <a-col v-for="(item, i) in 3" :key="i" class="carts-item-list">
          <CartsListItem :products="[]" />
        </a-col>
      </a-row>
    </div>

    <div class="carts-card__button-container">
      <a-row>
        <a-col :span="24">
          <primary-button
            class="update-button"
            :text="'ยืนยันการสั่งจ่าย'"
            block
            :on-click="showModal"
            :size="'large'"
          />
        </a-col>
      </a-row>
    </div>
    <a-modal
      v-model="visible"
      wrap-class-name="update-item__modal"
      centered
      :closable="false"
      :footer="null"
    >
      <div class="text-center">
        <a-icon
          size="large"
          type="check-circle"
          theme="twoTone"
          two-tone-color="#52c41a"
        />
      </div>
      <div class="text-center">
        ยืนยันการสั่งจ่ายเรียบร้อย
      </div>
      <a-input
        id="textToCopy"
        ref="textToCopy"
        v-model="url"
        placeholder="Link URL"
        class="mb-4 input-round"
      />
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
    </a-modal>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import CartsListItem from '~/components/carts/CartsListItem.vue'
import CardPatientDetail from '~/components/CardPatientDetail.vue'
import PatientModule from '~/store/patient.module'
import { Patient } from '~/types/patient.type'
import PrimaryButton from '~/components/procurement/buttons/PrimaryButton.vue'
import DoctorModule from '~/store/doctor.module'

export default Vue.extend({
  components: {
    CardPatientDetail,
    CartsListItem,
    PrimaryButton
  },
  layout: 'product-layout',
  data() {
    return {
      visible: false,
      amount: 1,
      url: 'https://www.thairod.co.th/lorem/17'
    }
  },
  computed: {
    patient (): Patient {
      return DoctorModule.patient
    },
    hash (): string {
      return this.$route.query.doctor as string
    }
  },
  async mounted () {
    await DoctorModule.getDoctorOrder({ hash: this.hash })
    // await CheckoutModule.getPatient({ id: 1 })
  },
  methods: {
    showModal (): void {
      this.visible = true
    },
    closeModal (): void {
      this.visible = false
    },
    copyLink (): void {
      const copyText = document.getElementById('textToCopy') as HTMLInputElement
      copyText.select()
      document.execCommand('copy')
      this.success()
      setTimeout(() => this.closeModal(), 1000)
    },
    success (): void {
      this.$message.success('Copied', 1)
    }
  }
})
</script>

<style>
.input-round {
  border-radius: 40px;
}

.carts-card__container {
  margin-bottom: 60px;
}

.carts-card__title {
  font-size: 1.25rem;
  color: #000000;
  margin-bottom: 20px;
}

.carts-card__subtitle {
  font-size: 1rem;
  color: #000000;
  margin-bottom: 12px;
}

.carts-item-list {
  margin-bottom: 18px;
}

.carts-card__button-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  padding: 16px;
}

.carts-card__button-container .update-button {
  font-size: 18px;
}

.checkout__button {
  color: #ffffff;
  background-color: #666666;
  border: 1px solid #666666;
  border-radius: 0;
  height: 48px;
}
</style>
