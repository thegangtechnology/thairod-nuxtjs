<template>
  <div class="order-container">
    <div class="order-header">
      <h1>ภาพรวมรายการจัดส่ง</h1>
      <a-button @click="toAssign">To Assign Page</a-button>
    </div>
    <OrderOverview />
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

  toAssign() {
    this.$router.push(`/assign`);
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
