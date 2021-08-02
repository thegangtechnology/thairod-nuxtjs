<template>
  <div class="container">
    <a-row :gutter="16" class="product-detail">
      <a-col :xs="24" :sm="12" :md="9" :lg="8" :xl="8">
        <img
          alt="example"
          :src="require('@/assets/images/default/set-p.svg')"
          class="img-responsive product-detail__image"
        >
      </a-col>
      <a-col :xs="24" :sm="12" :md="15" :lg="16" :xl="16">
        <div class="product-detail__name">
          {{ data.name }}
        </div>

        <div class="product-detail__description">
          {{ data.description }}
        </div>

<!--    for set-->
        <div class="product-detail__description">
          <a-row :gutter="16">
            <a-col
              v-for="(item, i) in data.itemSets"
              :key="i"
              :xs="24"
              :sm="24"
              :md="12"
              :lg="8"
              :xl="8"
              class="product-card__item-container"
            >
              <a-row type="flex" class="item">
                <a-col flex="50px">
                  <img
                    alt="example"
                    :src="item.image"
                    class="img-responsive"
                  >
                </a-col>
                <a-col flex="auto" class="item__detils">
                  <div class="item__name">
                    {{ item.name }}
                  </div>
                  <div class="item__amount">
                    {{ item.amount }}
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </div>

        <div class="product-detail__title">
          รายละเอียด
        </div>
        <div class="product-detail__description">
          {{ data.detail }}
        </div>

        <div class="product-detail__title">
          จำนวนสินค้าในคลัง
        </div>
        <div class="product-detail__description">
          100 กระปุก
        </div>
      </a-col>
    </a-row>
    <div class="product-card__button-container">
      <a-row :gutter="16" type="flex">
        <a-col :span="12">
          <a-button-group>
            <a-button class="update-item__button" @click="handleMinus">
              -
            </a-button>
            <a-input-number
              :value="amount"
              :min="0"
              :max="1000"
              :formatter="
                value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              "
              class="input-amount"
              @change="updateAmount"
            />
            <a-button class="update-item__button" @click="handlePlus">
              +
            </a-button>
          </a-button-group>
        </a-col>
        <a-col :span="12">
          <primary-button class="update-button" :text="'เพิ่มใส่ตะกร้า'" block :on-click="addToCart" :size="'large'" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Product } from '~/types/product.type'
import PrimaryButton from '~/components/procurement/buttons/PrimaryButton.vue'

export default Vue.extend({
  components: { PrimaryButton },
  props: {
    item: {
      type: Object as PropType<Product>,
      default: () => {}
    }
  },
  data () {
    return {
      amount: 1,
      // mockup data
      data: {
        id: 1,
        name: 'Favipiravir',
        description: '1 ชุด มี 12 เม็ด',
        detail: ' Favipiravir มีฤทธิ์ต้านไวรัสในกลุ่มอาร์เอนเอไวรัสได้หลาย ชนิด เช่น ไวรัสไข้หวัดใหญ่ (influenza virus), ไวรัสโรคปาก และเท้าเปื่อย (foot-and-mouth disease virus), ไวรัส ไข้เหลือง (yellow fever virus)นอกจากนี้ยังมีการศึกษาอย่าง ต่อเนื่องกับไวรัสที่ก่อโรคในคนอีกหลายชนิดการที่ยานี้จะมีฤทธิ์ต้านไวรัสได้ต้องถูกเปลี่ยนแปลงในร่างกายโดยเอนไซม์ ภายในเซลล์ได้เป็นfavipiravir ribosyl triphosphate ที่มีฤทธิ์ ในการยับยั้งเอนไซม์ RNA-dependent RNA polymerase (หรือ RNA replicase) ซึ่งเอนไซม์ดังกล่าวมีความสำคัญใน กระบวน การถ่ายแบบอาร์เอ็นเอ (RNA replication) นอกจาก นี้สารออกฤทธิ์ดังกล่าวยังทำให้เกิดการ สร้างสารพันธุกรรม อาร์เอนเอของไวรัสที่ผิดปกติและทำให้ไวรัสตาย ยานี้ไม่ยับ ยั้งการสร้างอาร์เอ็นเอและดีเอ็นเอในเซลล์สัตว์เลี้ยงลูกด้วยนม จึงไม่เป็นอันตรายต่อเซลล์ของคนและสัตว์',
        amount: 100,
        itemSets: [
          {
            id: 1,
            image: require('@/assets/images/default/icon-product-2.svg'),
            name: 'ยา Favipiravir',
            amount: '1 กล่อง'
          },
          {
            id: 2,
            image: require('@/assets/images/default/icon-product-3.svg'),
            name: 'อาหาร',
            amount: '1 กล่อง'
          },
          {
            id: 3,
            image: require('@/assets/images/default/icon-product-1.svg'),
            name: 'ที่วัดค่าออกซิเจน',
            amount: '1 เครื่อง'
          }
        ]
      }
    }
  },
  methods: {
    updateAmount (value: number) {
      console.log('changed', value)
      this.amount = value
    },
    handleMinus (): void {
      this.amount--
    },
    handlePlus (): void {
      this.amount++
    },
    addToCart (): void {
      console.log('addtocart')
    }
  }
})
</script>

<style scoped lang="less">
.product-detail{
  margin-bottom: 60px;
}
.product-detail__title{
  font-family: 'FC Minimal', sans-serif;
  font-weight: bold;
  color: #001740;
  font-size:24px;
}
.product-detail__name {
  width: 100%;
  font-family: 'FC Minimal', sans-serif;
  font-weight: bold;
  color: #001740;
  font-size:24px;
}
.product-detail__description {
  margin-bottom: 16px;
  line-height:normal;
}
.product-detail__image {
  max-width: 250px;
  width: 100%;
  margin: auto;
}
.product-card__item-container {
  margin-bottom: 24px;
}
.item__detils {
  margin-left: 8px;
}
.item__name {
  font-size: 1rem;
}
.item__amount {
  font-size: 1.25rem;
}
.product-card__button-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  padding: 16px;
}
.product-card__button-container .update-button {
  font-size: 18px;
}
.product-card__button-container .ant-btn-group {
  max-width: 200px;
  display: flex;
  align-items: center;
  margin: auto;
}
.product-card__button-container .ant-input-number-input-wrap input{
  text-align: center;
}
.product-card__button-container .input-amount {
  border-color: transparent;
  width: 100%;
}
.ant-input-number-handler-wrap {
  display: none;
  box-shadow: none;
}
.product-card__button-container > input::-webkit-outer-spin-button,
.product-card__button-container > input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
.product-card__button-container  > input[type='number'] {
  -moz-appearance: textfield !important;
}
.product-card__button-container .update-item__button{
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  padding: 0;
  border-radius: 50% !important;

}
.product-detail__button {
  color: #ffffff;
  background-color: #666666;
  border:1px solid #666666;
  border-radius:0;
  height:48px;
}
@media only screen and (max-width: 599px) {

.product-detail__image {
  max-width: 100%;
  width: 100%;
}
  .product-detail__name {
    margin-top: 1rem;
  }
}
</style>

<style lang="less">
.input-amount > .ant-input-number-input-wrap input{
  text-align: center;
}
</style>
