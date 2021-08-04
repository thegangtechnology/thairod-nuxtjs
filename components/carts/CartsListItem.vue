<template>
  <div>
    <a-row type="flex" class="item-list ant-row-flex-no-wrap">
      <a-col :xs="5" :sm="4" :md="3" :lg="3" :xl="2">
        <img
          alt="image item"
          :src="product.image"
          class="img-responsive item__image"
        >
      </a-col>
      <a-col
        :xs="19"
        :sm="20"
        :md="21"
        :lg="21"
        :xl="22"
        class="item__detils"
      >
        <div class="item__name">
          {{ product.name }}
        </div>
        <div class="item__description">
          {{ product.productDescription }}
        </div>
        <a-row>
          <a-col :span="20">
            <div class="update-item-button__container">
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
            </div>
          </a-col>
          <a-col :span="4" align="end">
            <a-button shape="circle" icon="delete" class="btn-delete__button" @click="removeItem" />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script lang='ts'>
import Vue, { PropType } from 'vue'
import { Product } from '~/types/product.type'

export default Vue.extend({
  layout: 'product-layout',
  props: {
    product: {
      type: Object as PropType<Product>,
      default: () => {
        return {
          id: 0,
          quantity: 0
        }
      }

    }
  },
  data () {
    return {
      visible: false,
      amount: 1
    }
  },
  mounted () {
    this.amount = this.product!.quantity as number
  },
  methods: {
    showModal (): void {
      this.visible = true
    },
    handleOk (): void {
      this.visible = false
    },
    handleCancel (): void {
      this.visible = false
    },
    handleRemove (): void {
    },
    updateAmount (value: number) {
      this.amount = value
      this.$emit('updateAmount', this.amount, this.product.id)
    },
    handleMinus (): void {
      this.amount--
      this.$emit('handleMinus', this.amount, this.product.id)
    },
    handlePlus (): void {
      this.amount++
      this.$emit('handlePlus', this.amount, this.product.id)
    },
    removeItem (): void {
      this.$emit('removeItem', this.product.id)
    }
  }
})
</script>

<style lang='less'>
.item-list {
  align-items: center;
  border: 1px solid #E9ECF2;
  padding: 8px;
  border-radius: 8px;
}

.item__image {
  //max-width:80px;
  min-height: 80px;
  max-height: 120px;
}

.item__detils {
  padding-left: 12px !important;
}

.item__name {
  color: #000000;
  font-size: 24px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: normal;
}

.item__description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-list__button,
.item-list__button:hover,
.item-list__button:focus {
  background-color: #066f59;
  color: #ffffff;
  border-color: #066f59;
}

.item-amount {
  font-size: 1.75rem;
}

.item__sign {
  font-size: 1.25rem;
}

.ant-input-number-handler-wrap {
  display: none;
  box-shadow: none;
}

.btn-cancel__button {
  border-color: #8c8c8c;
  color: #000000;
}

.btn-update__button {
  border-color: #000000;
  background-color: #000000;
}

.btn-remove__button {
  border-color: #f24725;
  background-color: #f24725;
  color: #ffffff;
}

.update-item-button__container .ant-btn-group {
  display: flex;
  align-items: center;
}

.update-item-button__container .update-item__button.ant-btn {
  width: 22px;
  height: 22px;
  padding: 0;
  line-height: 20px;
  border-radius: 50% !important;
}

.update-item-button__container > input::-webkit-outer-spin-button,
.update-item-button__container > input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}

/* Firefox */
.update-item-button__container > input[type='number'] {
  -moz-appearance: textfield !important;
}

.update-item-button__container .ant-input-number-input {
  padding: 0 4px;
}

.update-item-button__container .ant-input-number-input-wrap input {
  text-align: center;
}

.update-item-button__container .input-amount {
  border-color: transparent;
}

.btn-delete__button.ant-btn {
  color: #D17676;
  background-color: rgba(249, 183, 183, 0.15);
  border-color: #D17676;
  width: 22px;
  height: 22px;
  min-width: 22px;
  font-size: 14px;
}

@media only screen and (max-width: 425px) {
  .update-item-button__container .input-amount {
    max-width: 50px;
  }
}
</style>
