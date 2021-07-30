<template>
  <div class="order-container">
    <div class="order-header">
      <h1>Assign Batch</h1>
      <a-button icon="home" @click="toOrder">To Order Overview</a-button>
      <a-button icon="plus" @click="assignBatch">Assign Batch</a-button>
    </div>
    <AssignOverview />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { OrderModule } from "~/store";

@Component
export default class Main extends Vue {
  created() {
    if (OrderModule.getOrderListLength < 1) {
      OrderModule.initialiseOrder();
    }
  }

  toOrder() {
    this.$router.push(`/order-overview`);
  }

  assignBatch() {
    this.$router.push(`/assign/create-batch`);
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
