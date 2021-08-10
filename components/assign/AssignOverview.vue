<template>
  <div class="assign-tab__container">
    <div>
      <a-tabs
        :default-active-key="tabKey"
        :animated="false"
        @change="onTabChange"
      >
        <a-tab-pane key="all">
          <span slot="tab"> ทั้งหมด ({{ getTotalLength }})</span>
          <AssignTable
            :original-data="originalData"
            :search="search"
            :tab-key="tabKey"
            :loading="isLoading"
            :amount="getTotalLength"
            @pageChange="handlePageChange"
          />
        </a-tab-pane>
        <a-tab-pane key="unassign">
          <span slot="tab"> ที่ต้องจัดการ ({{ getUnassignLength }})</span>
          <AssignTable
            :original-data="originalData"
            :search="search"
            :tab-key="tabKey"
            :loading="isLoading"
            :amount="getUnassignLength"
            @pageChange="handlePageChange"
          />
        </a-tab-pane>
        <a-tab-pane key="assign">
          <span slot="tab"> จัดการแล้ว ({{ getAssignLength }}) </span>
          <AssignTable
            :original-data="originalData"
            :search="search"
            :tab-key="tabKey"
            :loading="isLoading"
            :amount="getAssignLength"
            @pageChange="handlePageChange"
          />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import ShipmentModule from '~/store/shipment.module'

@Component
export default class AssignOverview extends Vue {
  @Prop({ required: true }) search!: string

  tabKey: string = 'all'

  get isLoading () {
    return ShipmentModule.loading
  }

  get originalData () {
    return ShipmentModule.getShipmentList
  }

  get getTotalLength () {
    return ShipmentModule.totalShipment
  }

  get getUnassignLength () {
    return ShipmentModule.nonbatchShipment
  }

  get getAssignLength () {
    return ShipmentModule.batchShipment
  }

  @Emit('sendTabKey')
  handleSendTab (value: string) {
    return value
  }

  mounted () {
    ShipmentModule.initialiseShipment({})
    this.handleSendTab('all')
  }

  handlePageChange (payload: {page: number; page_size: number}) {
    this.onTabChange(this.tabKey, payload.page, payload.page_size)
  }

  onTabChange (key: string, page: number = 1, page_size: number = 100) {
    if (key === 'all') {
      ShipmentModule.initialiseShipment({
        page,
        page_size
      })
    }
    if (key === 'unassign') {
      ShipmentModule.initialiseShipment({
        batch_isnull: true,
        page,
        page_size
      })
    }
    if (key === 'assign') {
      ShipmentModule.initialiseShipment({
        batch_isnull: false,
        page,
        page_size
      })
    }
    this.handleSendTab(key)
    this.tabKey = key
  }
}
</script>
