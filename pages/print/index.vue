<template>
  <div class="page__container">
    <div class="page-card__container">
      <div class="page-card__header">
        <div class="page-header__title">พิมพ์ใบจัดส่งสินค้า</div>
        <a-input
          class="page-header__search"
          v-model="search"
          placeholder="ค้นหา"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
      <PrintTable :search="search" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { OrderModule } from "~/store";

@Component
export default class Main extends Vue {
  search: string = "";

  created() {
    if (OrderModule.getOrderListLength < 1) {
      OrderModule.initialiseOrder();
    }
  }
}
</script>
