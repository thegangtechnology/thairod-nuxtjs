<template>
  <div class="page__container">
    <div class="page-card__container">
      <div class="page-card__header">
        <div class="page-header__title">
          สร้างล็อตการจัดส่งใหม่
        </div>
        <a-input
          v-model="search"
          class="page-header__search"
          placeholder="ค้นหา"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
      <AssignForm
        :original-data="originalData"
        :loading="isLoading"
        :amount="amount"
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
  amount: number = 0

  get isLoading () {
    return ShipmentModule.loading
  }

  get originalData () {
    return ShipmentModule.getShipmentList
  }

  mounted () {
    this.handlePageChange(1)
  }

  handlePageChange (page: number) {
    this.onQueryChange(page)
  }

  onQueryChange (page: number = 1) {
    const type = this.$route.query.type
    if (type && type === 'assign') {
      ShipmentModule.initialiseShipment({
        batch_isnull: false,
        page
      })
      this.amount = ShipmentModule.totalShipment
    } else {
      ShipmentModule.initialiseShipment({
        batch_isnull: true,
        page
      })
      this.amount = ShipmentModule.nonbatchShipment
    }
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
