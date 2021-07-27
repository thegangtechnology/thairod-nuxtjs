<template>
  <div>
    <h2 v-if="!isSubmit">
      กรุณาตรวจสอบข้อมูล
    </h2>
    <a-alert v-else message="Successfully Submit" type="success" show-icon/>

    <h3>Order Detail:</h3>
    <ItemOrder :items="items"/>

    <a-divider/>

    <h3>Address Detail:</h3>
    <AddressOrder/>

    <a-row type="flex" justify="space-around">
      <a-col span="11">
        <a-button block @click="backToAddress">
          Back
        </a-button>
      </a-col>

      <a-col span="2"/>

      <a-col span="11">
        <a-button type="primary" block @click="submitOrder">
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

export default Vue.extend({
  components: {
    ItemOrder,
    AddressOrder
  },
  layout: 'mobile-empty',
  data () {
    return {
      items: [
        {
          name: 'Item 1',
          total: 2
        },
        {
          name: 'Item 2',
          total: 5
        },
        {
          name: 'Item 3',
          total: 1
        },
        {
          name: 'Item 4',
          total: 10
        }
      ],
      isSubmit: false
    }
  },
  methods: {
    backToAddress (): void {
      this.$router.push('/order')
    },

    submitOrder (): void {
      this.isSubmit = true

      setTimeout(() => {
        this.isSubmit = false
      }, 3000)
    }
  }
})
</script>
