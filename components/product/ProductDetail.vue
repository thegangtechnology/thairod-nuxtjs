<template>
  <div class="container">
    <a-row :gutter="16" class="product-detail">
      <a-col :xs="24" :sm="12" :md="9" :lg="8" :xl="8">
        <img
          alt="example"
          :src="item.image"
          class="img-responsive product-detail__image"
        >
      </a-col>
      <a-col :xs="24" :sm="12" :md="15" :lg="16" :xl="16">
        <div class="product-detail__name">
          {{ item.name }}
        </div>

        <div class="product-detail__description">
          {{ item.description }}
        </div>

        <!--    for set-->
        <!--        <div class="product-detail__description">-->
        <!--          <a-row :gutter="16">-->
        <!--            <a-col-->
        <!--              v-for="(item, i) in data.itemSets"-->
        <!--              :key="i"-->
        <!--              :xs="24"-->
        <!--              :sm="24"-->
        <!--              :md="12"-->
        <!--              :lg="8"-->
        <!--              :xl="8"-->
        <!--              class="product-card__item-container"-->
        <!--            >-->
        <!--              <a-row type="flex" class="item">-->
        <!--                <a-col flex="50px">-->
        <!--                  <img-->
        <!--                    alt="example"-->
        <!--                    :src="item.image"-->
        <!--                    class="img-responsive"-->
        <!--                  >-->
        <!--                </a-col>-->
        <!--                <a-col flex="auto" class="item__detils">-->
        <!--                  <div class="item__name">-->
        <!--                    {{ item.name }}-->
        <!--                  </div>-->
        <!--                  <div class="item__amount">-->
        <!--                    {{ item.amount }}-->
        <!--                  </div>-->
        <!--                </a-col>-->
        <!--              </a-row>-->
        <!--            </a-col>-->
        <!--          </a-row>-->
        <!--        </div>-->

        <div class="product-detail__title">
          รายละเอียด
        </div>
        <div class="product-detail__description">
          {{ item.productDescription }}
        </div>
        <!--for stock-->
        <!--        <div class="product-detail__title">-->
        <!--          จำนวนสินค้าในคลัง-->
        <!--        </div>-->
        <!--        <div class="product-detail__description">-->
        <!--          100 กระปุก-->
        <!--        </div>-->
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
              :min="1"
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
          <primary-button
            class="update-button ripple"
            :text="'เพิ่มใส่ตะกร้า'"
            block
            :on-click="addToCart"
            :size="'large'"
          />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ICheckoutProduct, Product } from '~/types/product.type'
import PrimaryButton from '~/components/procurement/buttons/PrimaryButton.vue'

export default Vue.extend({
  components: { PrimaryButton },
  props: {
    item: {
      type: Object as PropType<Product>,
      default: () => {
      }
    }
  },
  data () {
    return {
      amount: 1,
      form: {}
    }
  },
  computed: {
    getAmount (): number {
      let quantity = 1
      if (sessionStorage.getItem('doc-or-storage')) {
        const cartItems = JSON.parse(sessionStorage.getItem('doc-or-storage') as string)
        const foundItem = cartItems.find((item: ICheckoutProduct) => item.itemId === Number(this.$route.params.uid))
        if (foundItem) {
          quantity = foundItem.quantity
        }
      }
      return quantity
    }
  },
  mounted () {
    this.amount = this.getAmount
  },
  methods: {
    updateAmount (value: number) {
      this.amount = value
    },
    handleMinus (): void {
      this.amount--
    },
    handlePlus (): void {
      this.amount++
    },
    addToCart (): void {
      this.$emit('updateAmount', this.amount, this.item)
    }
  }
})
</script>

<style scoped lang="less">
.product-detail {
  margin-bottom: 60px;
}

.product-detail__title {
  font-family: 'FC Minimal', sans-serif;
  font-weight: bold;
  color: #001740;
  font-size: 24px;
}

.product-detail__name {
  width: 100%;
  font-family: 'FC Minimal', sans-serif;
  font-weight: bold;
  color: #001740;
  font-size: 24px;
}

.product-detail__description {
  margin-bottom: 16px;
  line-height: normal;
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

.update-button.ripple {
  background-position: center;
  transition: background 0.6s;

  &:hover {
    background: #FAC5C5 radial-gradient(circle, transparent 1%, #FAC5C5 1%) center/15000%;
  }

  &:active {
    background-color: #FAC5C5;
    background-size: 100%;
    transition: background 0s;
  }
}

.product-card__button-container .ant-btn-group {
  max-width: 200px;
  display: flex;
  align-items: center;
  margin: auto;
}

.product-card__button-container .ant-input-number-input-wrap input {
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

.product-card__button-container > input[type='number'] {
  -moz-appearance: textfield !important;
}

.product-card__button-container .update-item__button {
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
  border: 1px solid #666666;
  border-radius: 0;
  height: 48px;
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
.input-amount > .ant-input-number-input-wrap input {
  text-align: center;
}
</style>
