<template>
  <div class="print-tab__container">
    <div>
      <a-tabs
        :default-active-key="tabKey"
        :animated="false"
        @change="onTabChange"
      >
        <a-tab-pane key="all">
          <span slot="tab"> ทั้งหมด ({{ getTotalLength }})</span>
          <PrintTable
            :original-data="originalData"
            :search="search"
            :tab-key="tabKey"
            :update="isUpdate"
            :loading="isLoading"
            :amount="getTotalLength"
            @pageChange="handlePageChange"
            @cancel="handleCancelUpdate"
          />
        </a-tab-pane>
        <a-tab-pane key="unprinted">
          <span slot="tab"> ที่ต้องพิมพ์ ({{ getUnprintedLength }})</span>
          <PrintTable
            :original-data="originalData"
            :search="search"
            :tab-key="tabKey"
            :update="false"
            :loading="isLoading"
            :amount="getUnprintedLength"
            @pageChange="handlePageChange"
            @selectChange="onSelectChange"
          />
        </a-tab-pane>
        <a-tab-pane key="printed">
          <span slot="tab"> ดำเนินการพิมพ์แล้ว ({{ getPrintedLength }}) </span>
          <PrintTable
            :original-data="originalData"
            :search="search"
            :tab-key="tabKey"
            :update="isUpdate"
            :loading="isLoading"
            :amount="getPrintedLength"
            @pageChange="handlePageChange"
            @cancel="handleCancelUpdate"
            @selectChange="onSelectChange"
          />
        </a-tab-pane>
        <!--        <div-->
        <!--          v-if="!isUpdate"-->
        <!--          slot="tabBarExtraContent"-->
        <!--          class="print-tab__buttons"-->
        <!--        >-->
        <!--          <a-button-->
        <!--            v-if="tabKey !== 'unprinted'"-->
        <!--            class="print-button__cta"-->
        <!--            @click="isUpdate = true"-->
        <!--          >-->
        <!--            อัปเดตการพิมพ์ใบจัดส่ง-->
        <!--          </a-button>-->
        <!--          <a-button-->
        <!--            v-if="tabKey !== 'printed'"-->
        <!--            class="print-button__cta primary"-->
        <!--            @click="toCreatePrint"-->
        <!--          >-->
        <!--            พิมพ์ใบจัดส่งสินค้า-->
        <!--          </a-button>-->
        <!--        </div>-->
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import ShipmentModule from '~/store/shipment.module'

@Component
export default class PrintOverview extends Vue {
  @Prop({ required: true }) search!: string
  @Prop({ required: true }) option!: boolean

  tabKey: string = 'all'
  isUpdate: boolean = false

  @Watch('option', { immediate: true, deep: true })
  onOptionChange () {
    this.isUpdate = this.option
  }

  @Emit('sendTabKey')
  handleSendTab (value: string) {
    return value
  }

  @Emit('selectedKeys')
  onSelectChange (selectedKeys: number[]) {
    return selectedKeys
  }

  @Emit('sendTabUpdate')
  handleSendTabUpdate (value: boolean) {
    return value
  }

  @Emit('sendCancelTabUpdate')
  handleCancelTabUpdate (value: boolean) {
    return value
  }

  get isLoading () {
    return ShipmentModule.loading
  }

  get originalData () {
    return ShipmentModule.getShipmentList
  }

  get getTotalLength () {
    return ShipmentModule.totalShipment
  }

  get getUnprintedLength () {
    return ShipmentModule.waitShipment
  }

  get getPrintedLength () {
    return ShipmentModule.printShipment
  }

  mounted () {
    ShipmentModule.initialiseShipment({})
  }

  handleCancelUpdate () {
    this.isUpdate = false
    this.handleSendTabUpdate(this.isUpdate)
  }

  handlePageChange (payload: {page: number; page_size: number, isUpdate: boolean}) {
    this.onTabChange(this.tabKey, payload.page, payload.page_size, payload.isUpdate)
    this.handleSendTabUpdate(false)
  }

  toCreatePrint () {
    this.$router.push('/print/create-print')
  }

  onTabChange (key: string, page: number = 1, page_size: number = 100, isUpdate: boolean = false) {
    if (key === 'all') {
      ShipmentModule.initialiseShipment({
        page,
        page_size
      })
    }
    if (key === 'unprinted') {
      ShipmentModule.initialiseShipment({
        label_printed: false,
        deliver: false,
        page,
        page_size
      })
    }
    if (key === 'printed') {
      ShipmentModule.initialiseShipment({
        label_printed: true,
        deliver: false,
        page,
        page_size
      })
    }
    this.tabKey = key
    this.handleSendTab(key)
    this.handleSendTabUpdate(false)
    this.isUpdate = isUpdate
  }
}
</script>
