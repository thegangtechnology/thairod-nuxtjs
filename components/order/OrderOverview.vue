<template>
  <div>
    <div class="overview-tab__container">
      <a-tabs
        :default-active-key="tabKey"
        :animated="false"
        @change="onTabChange"
      >
        <a-tab-pane key="all">
          <span slot="tab"> ทั้งหมด ({{ getTabContentAmount('all') }})</span>
          <OverviewTable
            :original-data="originalData"
            :search="search"
            :tab-key="tabKey"
            :option="option"
            :loading="isLoading"
            :save="save"
            :amount="getTabContentAmount('all')"
            @pageChange="handlePageChange"
          />
        </a-tab-pane>
        <a-tab-pane key="wait">
          <span slot="tab">
            ที่ต้องจัดส่ง ({{ getTabContentAmount('wait') }})
          </span>
          <OverviewTable
            :original-data="originalData"
            :search="search"
            :tab-key="tabKey"
            :option="option"
            :loading="isLoading"
            :save="save"
            :amount="getTabContentAmount('wait')"
            @pageChange="handlePageChange"
            @selectChange="onSelectChange"
          />
        </a-tab-pane>
        <a-tab-pane key="print">
          <span slot="tab">
            พิมพ์ใบจัดส่งแล้ว ({{ getTabContentAmount('print') }})
          </span>
          <OverviewTable
            :original-data="originalData"
            :search="search"
            :tab-key="tabKey"
            :option="option"
            :loading="isLoading"
            :save="save"
            :amount="getTabContentAmount('print')"
            @pageChange="handlePageChange"
            @cancelSubmit="onSaveChange"
            @selectChange="onSelectChange"
          />
        </a-tab-pane>
        <a-tab-pane key="out">
          <span slot="tab">
            ดำเนินการส่งแล้ว ({{ getTabContentAmount('out') }})
          </span>
          <OverviewTable
            :original-data="originalData"
            :search="search"
            :tab-key="tabKey"
            :option="option"
            :loading="isLoading"
            :save="save"
            :amount="getTabContentAmount('out')"
            @pageChange="handlePageChange"
            @selectChange="onSelectChange"
          />
        </a-tab-pane>
        <a-tab-pane key="received">
          <span slot="tab">
            ส่งมอบสำเร็จ ({{ getTabContentAmount('received') }})
          </span>
          <OverviewTable
            :original-data="originalData"
            :search="search"
            :tab-key="tabKey"
            :option="option"
            :loading="isLoading"
            :save="save"
            :amount="getTabContentAmount('received')"
            @pageChange="handlePageChange"
            @selectChange="onSelectChange"
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
export default class OrderOverview extends Vue {
  @Prop({ required: true }) search!: string
  @Prop({ required: true }) option!: string
  @Prop({ required: true }) save!: boolean

  tabKey: string = 'wait'
  showDefault: boolean = false
  printConfirm: boolean = false

  get isLoading () {
    return ShipmentModule.loading
  }

  get originalData () {
    return ShipmentModule.getShipmentList
  }

  get canUpdatePrint () {
    return this.tabKey !== 'received' && this.tabKey !== 'out'
  }

  get canUpdateOutForDelivery () {
    return this.tabKey !== 'wait' && this.tabKey !== 'received'
  }

  get canUpdateReceived () {
    return this.tabKey !== 'wait' && this.tabKey !== 'print'
  }

  @Emit('onUpdate')
  handleOptionChange (value: string) {
    return value
  }

  @Emit('sendTabKey')
  handleSendTab (value: string) {
    return value
  }

  @Emit('selectedKeys')
  onSelectChange (selectedKeys: number[]) {
    return selectedKeys
  }

  @Emit('saveSelection')
  onSaveChange (isSave: boolean = false) {
    return { savable: false, isSave }
  }

  mounted () {
    ShipmentModule.initialiseShipment({
      label_printed: false,
      deliver: false
    })
    this.handleSendTab('wait')
  }

  getTabContentAmount (tabKey: string): number {
    if (tabKey === 'wait') { return ShipmentModule.waitShipment }
    if (tabKey === 'print') { return ShipmentModule.printShipment }
    if (tabKey === 'out') { return ShipmentModule.outShipment }
    if (tabKey === 'received') { return ShipmentModule.receivedShipment }
    return ShipmentModule.totalShipment
  }

  handlePageChange (payload: {page: number; page_size: number, isSave: boolean}): void {
    this.onTabChange(this.tabKey, payload.page, payload.page_size, payload.isSave)
  }

  onTabChange (key: string, page: number = 1, page_size: number = 100, isSave: boolean = false): void {
    if (key === 'all') {
      ShipmentModule.initialiseShipment({
        page,
        page_size
      })
    }
    if (key === 'wait') {
      ShipmentModule.initialiseShipment({
        label_printed: false,
        deliver: false,
        page,
        page_size
      })
    }
    if (key === 'print') {
      ShipmentModule.initialiseShipment({
        label_printed: true,
        deliver: false,
        page,
        page_size
      })
    }
    if (key === 'out') {
      ShipmentModule.initialiseShipment({
        label_printed: true,
        deliver: true,
        page
      })
    }
    if (this.tabKey !== key) {
      this.handleSendTab(key)
    }
    this.tabKey = key
    if (isSave) {
      this.handleOptionChange('default')
      this.onSaveChange(true)
    }
  }
}
</script>
