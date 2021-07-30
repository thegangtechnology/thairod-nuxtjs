<template>
  <div class="order-container">
    <h1>Assign Batch</h1>
    <AssignForm :original-data="data" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { OrderModule } from '~/store'
import { IOrder } from '~/types/order.type'

@Component
export default class Main extends Vue {
  data: IOrder[] = []

  created() {
    if (OrderModule.getOrderListLength < 1) {
      OrderModule.initialiseOrder()
    }
  }

  mounted() {
    this.data = OrderModule.getOrderList.filter(
      (item) => item.exportBatch !== null
    )
  }
}
</script>

<style scoped>
.order-container {
  margin: 1rem;
}
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
