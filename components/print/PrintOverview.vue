<template>
  <div class="print-tab__container">
    <div>
      <a-tabs
        :default-active-key="tabKey"
        :animated="false"
        @change="onTabChange"
      >
        <a-tab-pane key="all">
          <span slot="tab"> ทั้งหมด ({{ allData.length }})</span>
          <PrintTable
            :original-data="allData"
            :search="search"
            :tab-key="tabKey"
          />
        </a-tab-pane>
        <a-tab-pane key="unprinted">
          <span slot="tab"> ที่ต้องพิมพ์ ({{ getUnprintedLength }})</span>
          <PrintTable
            :original-data="getUnprinted"
            :search="search"
            :tab-key="tabKey"
          />
        </a-tab-pane>
        <a-tab-pane key="printed">
          <span slot="tab"> ดำเนินการพิมพ์แล้ว ({{ getPrintedLength }}) </span>
          <PrintTable
            :original-data="getPrinted"
            :search="search"
            :tab-key="tabKey"
          />
        </a-tab-pane>
        <div slot="tabBarExtraContent" class="print-tab__buttons">
          <a-button class="print-button__cta">อัปเดตการพิมพ์ใบจัดส่ง</a-button>
          <a-button class="print-button__cta primary" @click="toCreatePrint">
            พิมพ์ใบจัดส่งสินค้า
          </a-button>
        </div>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ShipmentModule from '~/store/shipment.module'
import { ShipmentLine } from '~/types/shipment.type'

@Component
export default class PrintOverview extends Vue {
  @Prop({ required: true }) search!: string

  tabKey: string = 'all'
  originalData: ShipmentLine[] = []

  get allData() {
    return ShipmentModule.getShipmentList
  }

  get getUnprinted() {
    return this.allData.filter((item) => {
      return !item.label_printed
    })
  }

  get getPrinted() {
    return this.allData.filter((item) => {
      return item.label_printed
    })
  }

  get getUnprintedLength() {
    return this.getUnprinted.length
  }

  get getPrintedLength() {
    return this.getPrinted.length
  }

  toCreatePrint() {
    this.$router.push(`/print/create-print`)
  }

  onTabChange(key: string) {
    this.tabKey = key
  }
}
</script>
