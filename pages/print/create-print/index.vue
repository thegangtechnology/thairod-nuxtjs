<template>
  <div class="page__container">
    <div class="page-card__container">
      <div class="page-card__header">
        <div class="page-header__title">
          พิมพ์ใบจัดส่งสินค้า
        </div>
        <div class="overview-button__container top">
          <a-button class="overview-button__cta  no-border-btn cancel" @click="goBack">
            <span> ยกเลิก </span>
          </a-button>
          <a-button
            class="overview-button__cta  no-border-btn submit"
            :disabled="selectedRowKeys.length === 0"
            @click="onSave"
          >
            <span> พิมพ์  ({{ selectedRowKeys.length }})</span>
          </a-button>
        </div>
      </div>
      <PrintForm
        :original-data="originalData"
        :loading="isLoading"
        :amount="unprintedAmount"
        :search="search"
        :save="isSave"
        @pageChange="handlePageChange"
        @selectedKeys="handleSelectedKeys"
        @saveSelection="handleConvertSave"
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
  amount: number = 0
  isSave: boolean = false
  selectedRowKeys: number[] = []

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

  goBack () {
    this.$router.go(-1)
  }

  handleSelectedKeys (selectedRowKeys: number[]) {
    this.selectedRowKeys = selectedRowKeys
  }

  handleConvertSave (value: boolean) {
    this.isSave = value
  }

  handlePageChange (payload: {page: number; page_size: number}) {
    this.onQueryChange(payload.page, payload.page_size)
  }

  onSave () {
    this.isSave = true
  }

  onQueryChange (page: number = 1, page_size: number = 100) {
    ShipmentModule.initialiseShipment({
      label_printed: false,
      deliver: false,
      page,
      page_size
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
