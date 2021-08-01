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
      <PrintForm :original-data="data" :search="search" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ShipmentModule from '~/store/shipment.module'
import { ShipmentLine } from '~/types/shipment.type'

@Component
export default class Main extends Vue {
  data: ShipmentLine[] = []
  search: string = ''

  async created() {
    if (ShipmentModule.getShipmentLength < 1) {
      ShipmentModule.initialiseShipment()
    }
  }

  mounted() {
    this.data = ShipmentModule.getShipmentList.filter(
      (item) => !item.label_printed
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
