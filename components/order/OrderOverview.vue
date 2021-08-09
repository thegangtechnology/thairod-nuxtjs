<template>
  <div>
    <div>
      <div class="page-header__title">
        ภาพรวมรายการจัดส่ง
        --- {{ tabKey }}
      </div>
    </div>
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
            :option="updateOption"
            :loading="isLoading"
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
            :option="updateOption"
            :loading="isLoading"
            :amount="getTabContentAmount('wait')"
            @pageChange="handlePageChange"
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
            :option="updateOption"
            :loading="isLoading"
            :amount="getTabContentAmount('print')"
            @pageChange="handlePageChange"
            @update="handleCancelUpdate"
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
            :option="updateOption"
            :loading="isLoading"
            :amount="getTabContentAmount('out')"
            @pageChange="handlePageChange"
            @update="handleCancelUpdate"
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
            :option="updateOption"
            :loading="isLoading"
            :amount="getTabContentAmount('received')"
            @pageChange="handlePageChange"
            @update="handleCancelUpdate"
          />
        </a-tab-pane>
        <div
          v-if="tabKey !== 'all'"
          slot="tabBarExtraContent"
          class="overview-tab__buttons"
        >
          <a-button
            v-if="tabKey === 'wait'"
            class="assign-button__cta primary"
            @click="toPrint"
          >
            พิมพ์ใบจัดส่งสินค้า
          </a-button>
          <a-select v-else v-model="updateOption" class="overview-select__cta">
            <a-select-option value="default">
              อัปเดตข้อมูลรายการจัดส่ง
            </a-select-option>
            <a-select-option v-if="canUpdatePrint" value="updatePrint">
              อัปเดตการพิมพ์ใบจัดส่ง
            </a-select-option>
            <a-select-option
              v-if="canUpdateOutForDelivery"
              value="updateDelivery"
            >
              อัปเดตการจัดส่ง
            </a-select-option>
          <!-- <a-select-option v-if="canUpdateReceived" value="updateReceived">
            อัปเดตการส่งมอบ
          </a-select-option> -->
          </a-select>
        </div>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ShipmentModule from '~/store/shipment.module'

@Component
export default class OrderOverview extends Vue {
  @Prop({ required: true }) search!: string

  tabKey: string = 'wait'
  // updateOption: string = 'default'
  updateOption: string = 'default'

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

  mounted () {
    ShipmentModule.initialiseShipment({
      label_printed: false,
      deliver: false
    })
  }

  handleCancelUpdate () {
    this.updateOption = 'default'
  }

  getTabContentAmount (tabKey: string): number {
    if (tabKey === 'wait') { return ShipmentModule.waitShipment }
    if (tabKey === 'print') { return ShipmentModule.printShipment }
    if (tabKey === 'out') { return ShipmentModule.outShipment }
    if (tabKey === 'received') { return ShipmentModule.receivedShipment }
    return ShipmentModule.totalShipment
  }

  handlePageChange (page: number) {
    this.onTabChange(this.tabKey, page)
  }

  onTabChange (key: string, page: number = 1) {
    if (key === 'all') {
      ShipmentModule.initialiseShipment({
        page
      })
    }
    if (key === 'wait') {
      ShipmentModule.initialiseShipment({
        label_printed: false,
        deliver: false,
        page,
        page_size: 100
      })
    }
    if (key === 'print') {
      ShipmentModule.initialiseShipment({
        label_printed: true,
        deliver: false,
        page
      })
    }
    if (key === 'out') {
      ShipmentModule.initialiseShipment({
        label_printed: true,
        deliver: true,
        page
      })
    }
    this.tabKey = key
    this.updateOption = 'default'
  }

  toPrint () {
    this.$router.push('/print')
  }
}
</script>
