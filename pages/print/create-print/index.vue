<template>
  <div class="page__container">
    <div class="page-card__container">
      <div class="page-card__header">
        <div class="page-header__title">
          พิมพ์ใบจัดส่งสินค้า
        </div>
        <a-input
          v-model="search"
          class="page-header__search"
          placeholder="ค้นหา"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
      <PrintForm
        :original-data="originalData"
        :loading="isLoading"
        :amount="unprintedAmount"
        :search="search"
        @pageChange="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ShipmentModule from '~/store/shipment.module'

@Component
export default class Main extends Vue {
  search: string = ''

  get isLoading () {
    return ShipmentModule.loading
  }

  get originalData () {
    return ShipmentModule.getShipmentList
  }

  get unprintedAmount () {
    return ShipmentModule.waitShipment
  }

  mounted () {
    this.onQueryChange(1)
  }

  handlePageChange (page: number) {
    this.onQueryChange(page)
  }

  onQueryChange (page: number = 1) {
    ShipmentModule.initialiseShipment({
      label_printed: false,
      deliver: false,
      page
    })
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
