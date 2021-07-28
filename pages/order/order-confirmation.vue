<template>
  <div>
    <h2 v-if="!isSubmit">
      กรุณาตรวจสอบข้อมูล
    </h2>
    <a-alert v-else class="alert-box" message="Successfully Submit" type="success" />

    <h3>Order Detail:</h3>
    <ItemOrder :items="order.orderLines" />

    <a-divider />

    <h3>Address Detail:</h3>
    <AddressOrder :detail="order.address" />

    <a-row class="button-wrapper" justify="space-around" type="flex">
      <a-col span="11">
        <a-button block @click="backToAddress">
          Back
        </a-button>
      </a-col>

      <a-col span="2" />

      <a-col span="11">
        <a-button block type="primary" @click="submitOrder">
          Submit
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ItemOrder from '~/components/order/ItemOrder.vue'
import AddressOrder from '~/components/order/AddressOrder.vue'
import OrderModule from '~/store/order.module'
import { Order } from '~/types/order.type'

export default Vue.extend({
  components: {
    ItemOrder,
    AddressOrder
  },
  layout: 'mobile-empty',
  data () {
    return {
      isSubmit: false
    }
  },
  computed: {
    order (): Order {
      return OrderModule.order
    }
  },
  async mounted () {
    await OrderModule.getOrder({ id: 1 })
  },
  methods: {
    backToAddress (): void {
      this.$router.push('/order')
    },

    submitOrder (): void {
      this.isSubmit = true
      // hide alert box
      setTimeout(() => {
        this.isSubmit = false
      }, 3000)
    }
  }
})
</script>

<style scoped>
.button-wrapper {
  margin-top: 10px;
}

.ant-divider {
  height: 4px;
}

.ant-alert.ant-alert-success {
  background: #096F5A;
  margin-bottom: 8px;
}
</style>

<style>
.alert-box .ant-alert-message {
  color: white;
}
</style>
