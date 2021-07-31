<template>
  <div class="page__container">
    <div class="page-card__container">
      <div class="page-card__header">
        <div class="page-header__title">ภาพรวมรายการจัดส่ง</div>
        <div class="overview-button__container">
          <a-button class="overview-button__cta" @click="toPrint">
            <img :src="PrinterIcon" alt="PrinterIcon" />
            <span> พิมพ์ใบจัดส่งสินค้า </span>
          </a-button>
          <a-button class="overview-button__cta" @click="toDelivery">
            <img :src="TruckIcon" alt="TruckIcon" />
            <span> อัปเดตการจัดส่ง </span>
          </a-button>
        </div>
        <a-input
          class="page-header__search"
          v-model="search"
          placeholder="ค้นหา"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
      <OrderOverview :search="search" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TruckSvg from '~/assets/icons/truck.svg'
import PrinterSvg from '~/assets/icons/printer.svg'
import { ShipmentModule } from '~/store'

@Component
export default class Main extends Vue {
  private TruckIcon = TruckSvg
  private PrinterIcon = PrinterSvg
  search: string = ''

  created() {
    if (ShipmentModule.getShipmentLength < 1) {
      ShipmentModule.initialiseOrder()
    }
  }

  toPrint() {
    this.$router.push(`/print`)
  }

  toDelivery() {
    this.$router.push(`/order-overview/delivery`)
  }
}
</script>
