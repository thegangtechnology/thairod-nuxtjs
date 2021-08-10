<template>
  <div class="page__container">
    <div class="page-card__container">
      <div class="page-card__header">
        <div class="page-header__title">
          {{ title }}
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
            <span v-if="type"> บันทึก ({{ selectedRowKeys.length }})</span>
            <span v-else> สร้าง  ({{ selectedRowKeys.length }})</span>
          </a-button>
        </div>
      </div>
      <AssignForm
        :original-data="originalData"
        :loading="isLoading"
        :amount="amount"
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

  get type () {
    return this.$route.query.type
  }

  get title () {
    const type = this.$route.query.type
    if (type && type === 'assign') { return 'แก้ไขล็อตการจัดส่ง' }
    return 'สร้างล็อตการจัดส่งใหม่'
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
    this.selectedRowKeys = []
  }

  handlePageChange (payload: {page: number; page_size: number}) {
    this.onQueryChange(payload.page, payload.page_size)
  }

  onSave () {
    this.isSave = true
  }

  onQueryChange (page: number = 1, page_size: number = 100) {
    const type = this.$route.query.type
    if (type && type === 'assign') {
      ShipmentModule.initialiseShipment({
        batch_isnull: false,
        page,
        page_size
      })
      this.amount = ShipmentModule.totalShipment
    } else {
      ShipmentModule.initialiseShipment({
        batch_isnull: true,
        page,
        page_size
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
