<template>
  <div class="container">
    <div class="carts-card__container">
      <div class="carts-card__title">
        สินค้าในตะกร้า
      </div>
      <div class="carts-card__subtitle">
        สินค้า
      </div>
      <a-row class="mb-6">
        <a-col v-for="(item,i) in 3" :key="i" class="carts-item-list">
          <CartsListItem />
        </a-col>
      </a-row>
      <div>
        <PatientDetail />
      </div>
    </div>

    <div class="carts-card__button-container">
      <a-button block size="large" class="checkout__button" @click="showModal">
        Checkout
      </a-button>
    </div>
    <a-modal
      v-model="visible"
      wrap-class-name="update-item__modal"
      centered
      :closable="false"
      :footer="null"
    >
      <div>
        <a-icon size="large" type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
      </div>
      <div>
        ยืนยันการสั่งจ่ายเรียบร้อย
      </div>
      <a-input
        ref="textToCopy"
        v-model="url"
        placeholder="Link URL"
        disabled
        class="mb-4"
      />
      <a-button type="primary" block>
        คัดลอก RUL
        <a-icon type="copy" />
      </a-button>
    </a-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PatientDetail from '~/components/PatientDetail.vue'
import CartsListItem from '~/components/carts/CartsListItem.vue'

export default Vue.extend({
  components: {
    PatientDetail,
    CartsListItem
  },
  layout: 'product-layout',
  data () {
    return {
      visible: false,
      amount: 1,
      url: 'https://www.thairod.co.th/lorem/17'
    }
  },
  methods: {
    showModal (): void {
      this.visible = true
    },

    handleOk (): void {
      this.visible = false
    }

  }

})
</script>

<style>
.carts-card__container{
  margin-bottom: 30px;
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
.carts-item-list{
  margin-bottom:18px;
}
.carts-card__button-container{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.checkout__button{
  color: #ffffff;
  background-color: #666666;
  border:1px solid #666666;
  border-radius:0;
  height:48px;
}
</style>
