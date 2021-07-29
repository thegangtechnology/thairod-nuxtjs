<template>
  <div>
    <a-row type="flex" class="item-list ant-row-flex-no-wrap" :gutter="[8]">
      <a-col :xs="5" :sm="4" :md="4" :lg="4" :xl="4">
        <img
          alt="example"
          :src="require('@/assets/images/mockup/image-mockup.png')"
          class="img-responsive"
        >
      </a-col>
      <a-col
        :xs="12"
        :sm="16"
        :md="16"
        :lg="16"
        :xl="16"
        class="item__detils"
      >
        <div class="item__name">
          item Name Aaaaaaaa
        </div>
        <div class="item__description">
          Lorem ipsum dolor sit amet
        </div>
      </a-col>
      <a-col :xs="4" :sm="4" :md="2" :lg="2" :xl="2">
        <div class="item-amount">
          <span class="item__sign">X</span>1
        </div>
      </a-col>
      <a-col :xs="3" :sm="4" :md="2" :lg="2" :xl="2">
        <a-button
          type="edit"
          icon="edit"
          class="item-list__button"
          @click="showModal"
        />
      </a-col>
    </a-row>
    <a-modal
      v-model="visible"
      title="แก้ไขจำนวนสินค้า"
      wrap-class-name="update-item__modal"
      centered
      :closable="false"
    >
      <p>
        Item Name AAAA
      </p>
      <div>
        <a-button-group>
          <a-button class="update-item__minus" @click="handleMinus">
            <a-icon type="minus" />
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
          <a-button class="update-item__plus" @click="handlePlus">
            <a-icon type="plus" />
          </a-button>
        </a-button-group>
      </div>
      <template slot="footer">
        <a-button
          key="back"
          class="btn-cancel__button"
          size="large"
          @click="handleCancel"
        >
          Cancle
        </a-button>
        <a-button
          v-if="amount > 0"
          key="submit"
          type="primary"
          class="btn-update__button"
          size="large"
          @click="handleOk"
        >
          Update
        </a-button>
        <a-button
          v-else
          key="remove"
          type="danger"
          class="btn-remove__button"
          size="large"
          @click="handleRemove"
        >
          Remove
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'product-layout',
  data () {
    return {
      visible: false,
      amount: 1
    }
  },
  computed: {
  },
  methods: {
    showModal (): void {
      this.visible = true
    },
    handleOk (): void {
      this.visible = false
      console.log('amount', this.amount)
    },

    handleCancel (): void {
      this.visible = false
    },
    handleRemove (): void {
    },

    updateAmount (value: number) {
      console.log('changed', value)
      this.amount = value
    },
    handleMinus (): void {
      this.amount--
    },
    handlePlus (): void {
      this.amount++
    }
  }
})
</script>

<style>
.item-list {
  align-items: center;
}
.item__name {
  color: #000000;
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
.update-item__modal .ant-modal-content {
  max-width: 300px;
  margin: auto;
}
.update-item__modal .ant-modal-header {
  text-align: center;
  border: none;
}
.update-item__modal .ant-modal-body {
  text-align: center;
}
.update-item__modal .ant-modal-footer {
  text-align: center;
  border: none;
}
.update-item__modal .input-amount {
  border-color: transparent;
}
.update-item__modal .ant-input-number-input-wrap input {
  text-align: center;
}
.ant-input-number-handler-wrap {
  display: none;
  box-shadow: none;
}
.update-item__modal > input::-webkit-outer-spin-button,
.update-item__modal > input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
/* Firefox */
.update-item__modal > input[type='number'] {
  -moz-appearance: textfield !important;
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
.update-item__minus,
.update-item__plus {
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 0 !important;
}
@media only screen and (max-width: 425px) {
  .update-item__modal .ant-modal-content {
    max-width: 90%;
  }
}
</style>
