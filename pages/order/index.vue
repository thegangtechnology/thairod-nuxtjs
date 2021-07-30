<template>
  <div class="order-content-wrapper">
    <h2>กรุณาตรวจสอบข้อมูล</h2>
    <a-row>
      <a-col>
        <a-input v-model="form.firstName" placeholder="First Name" />
      </a-col>

      <a-col>
        <a-input v-model="form.lastName" placeholder="Last Name" />
      </a-col>

      <a-col>
        <a-input v-model="form.telephone" placeholder="Phone" />
      </a-col>

      <a-col>
        <a-textarea v-model="form.address" :rows="3" placeholder="Address" />
      </a-col>

      <a-col>
        <a-select
          placeholder="Province"
          style="width: 100%"
        />
      </a-col>

      <a-col>
        <a-select
          placeholder="District"
          style="width: 100%"
        />
      </a-col>

      <a-col>
        <a-select
          placeholder="Sub-District"
          style="width: 100%"
        />
      </a-col>

      <a-col>
        <a-input v-model="form.zipcode" placeholder="Zipcode" />
      </a-col>

      <a-col>
        <a-textarea v-model="form.optional" :rows="3" placeholder="(Optional)" />
      </a-col>
    </a-row>

    <a-row justify="space-around" type="flex">
      <a-col span="11">
        <a-button block>
          Back
        </a-button>
      </a-col>

      <a-col span="2" />

      <a-col span="11">
        <a-button block type="primary" @click="goToOrderConfirmation">
          Next
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import OrderModule from '~/store/order.module'
import { Order } from '~/types/order.type'

export default Vue.extend({
  layout: 'mobile-empty',
  data () {
    return {
      form: {}
    }
  },
  computed: {
    order (): Order {
      return OrderModule.order
    }
  },
  async mounted () {
    await OrderModule.getOrder({ id: 1 })
    this.form = this.order.address
  },
  methods: {
    goToOrderConfirmation (): void {
      this.$router.push('/order/order-confirmation')
    }
  }
})
</script>

<style scoped>
.order-content-wrapper .ant-col {
  margin: 10px 0;
}
</style>
