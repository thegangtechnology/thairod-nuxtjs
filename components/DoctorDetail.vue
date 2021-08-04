<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="6">
        <img
          alt="Docter icon"
          :src="require('@/assets/images/docter-female.svg')"
          class="img-responsive image__icon"
        >
      </a-col>
      <a-col :span="18">
        <div class="name__text">
          {{ doctorDetail.name }}
        </div>
        <div class="detail__text">
          ใบอนุญาตเลขที่ {{ doctorDetail.license }}
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang='ts'>
import Vue, { PropType } from 'vue'
import { DoctorInfo } from '~/types/order.type'

export default Vue.extend({
  props: {
    doctorDetail: {
      type: Object as PropType<DoctorInfo>,
      default: () => {
      }
    }
  }
})
</script>

<style>
.carts-detail__title {
  color: #000000;
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 20px;
}

.image__icon {
  height: 70px;
}

.detail__text {
  font-size: 20px;
  color: #3C3C3C;
  margin-bottom: 4px;
}

.name__text {
  font-size: 24px;
  color: #000000;
}
</style>
