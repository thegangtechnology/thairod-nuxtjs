<template>
  <div class="container">
    <div class="text-center mt-6">
      <img :src="require('@/assets/icons/icon-check.svg')" alt="icon check" class="ma-auto">
      <div class="text__title">
        ยืนยันการสั่งจ่ายเรียบร้อย
      </div>
    </div>
    <CardPatientDetail :patient-detail="{}" />

    <div class="button-container">
      <a-input
        id="textToCopy"
        ref="textToCopy"
        v-model="url"
        placeholder="Link URL"
        class="mb-4 input-round"
      />
      <a-row>
        <a-col :span="24">
          <primary-button
            class="update-button"
            :text="'ยืนยันการสั่งจ่าย'"
            block
            :on-click="copyLink"
            :size="'large'"
          />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CardPatientDetail from '~/components/CardPatientDetail.vue'
import PrimaryButton from '~/components/procurement/buttons/PrimaryButton.vue'

export default Vue.extend({
  components: {
    CardPatientDetail,
    PrimaryButton
  },
  layout: 'product-layout',
  data() {
    return {
      url: 'https://www.thairod.co.th/lorem/17'
    }
  },
  methods: {
    copyLink (): void {
      const copyText = document.getElementById('textToCopy')
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      document.execCommand('copy')
      if (document.execCommand('copy')) {
        this.success()
        setTimeout(() => this.closeModal(), 1000)
      }
    }
  }
})
</script>

<style scoped>
.text__title {
  font-size: 24px;
  color: #000000;
  margin-top: 14px;
}
.button-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  padding: 16px;
}
</style>
