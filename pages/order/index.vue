<template>
  <div class="order-content-wrapper">
    <h2>กรุณาตรวจสอบข้อมูล</h2>
    <a-row>
      <a-col>
        <a-input placeholder="First Name"/>
      </a-col>

      <a-col>
        <a-input placeholder="Last Name"/>
      </a-col>

      <a-col>
        <a-input placeholder="Telephone"/>
      </a-col>

      <a-col>
        <a-textarea placeholder="Address"/>
      </a-col>

      <a-col>
        <a-select
          style="width: 100%"
          placeholder="Province"
        />
      </a-col>

      <a-col>
        <a-select
          style="width: 100%"
          placeholder="District"
        />
      </a-col>

      <a-col>
        <a-select
          style="width: 100%"
          placeholder="Sub-District"
        />
      </a-col>

      <a-col>
        <a-input placeholder="Zipcode"/>
      </a-col>

      <a-col>
        <a-textarea placeholder="Pin (Optional)"/>
      </a-col>
    </a-row>

    <a-row type="flex" justify="space-around">
      <a-col span="11">
        <a-button block>Back</a-button>
      </a-col>

      <a-col span="2"></a-col>

      <a-col span="11">
        <a-button type="primary" block @click="goToOrderConfirmation">
          Next
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'mobile-empty',
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
