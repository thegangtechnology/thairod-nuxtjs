<template>
  <div class="print-body">
    <div class="print-body__container">
      <div class="print-filter__container">
        <div class="print-filter__header">
          <img :src="FilterIcon" alt="FilterIcon">
          <span> ตัวกรองข้อมูล </span>
        </div>
        <a-form layout="vertical">
          <div class="print-filter__form">
            <div class="date">
              <a-form-item label="วันและเวลาที่สั่ง">
                <a-date-picker @change="onDateFilterChange">
                  <div slot="suffixIcon">
                    <img :src="CalendarIcon" alt="CalendarIcon">
                  </div>
                </a-date-picker>
              </a-form-item>
            </div>
            <div class="batch">
              <a-form-item label="ล็อตการจัดส่ง">
                <a-select
                  label-in-value
                  :default-value="{ key: '' }"
                  @change="handleBatchFilterChange"
                >
                  <a-select-option value="">
                    All
                  </a-select-option>
                  <a-select-option
                    v-for="batch in exportBatchSelect"
                    :key="batch"
                    :value="batch"
                  >
                    {{ batch }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </div>
            <div class="package">
              <a-form-item label="สินค้าในรายการสั่งซื้อ">
                <a-select
                  label-in-value
                  :default-value="{ key: '' }"
                  @change="handleOrderedItemFilterChange"
                >
                  <a-select-option value="">
                    All
                  </a-select-option>
                  <a-select-option
                    v-for="item in shipmentItemSelect"
                    :key="item"
                    :value="item"
                  >
                    {{ item }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </div>
          </div>
        </a-form>
      </div>
      <div class="print-table__container">
        <a-table
          row-key="id"
          :row-selection="
            update
              ? {
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange,
                onSelect: handleSelectChange,
                onSelectAll: handleSelectAllChange,
              }
              : null
          "
          :pagination="{
            total: amount,
          }"
          :loading="loading"
          :columns="tableColumns"
          :data-source="data"
          @change="onPageChange"
        >
          <div slot="id" slot-scope="text, record" class="table-form__input">
            <div>
              {{ record.id }}
            </div>
            <div>
              {{ record.created_date | date }}
            </div>
          </div>
          <div
            slot="shipmentItem"
            slot-scope="text, record"
            class="table-form__input"
          >
            <div v-for="item in record.shipmentItem" :key="item.id">
              {{ item.name }}
            </div>
          </div>
          <div
            slot="quantity"
            slot-scope="text, record"
            class="table-form__input"
          >
            <div v-for="item in record.shipmentItem" :key="item.id">
              x{{ item.quantity }} {{ item.unit }}
            </div>
          </div>
          <div
            slot="patientName"
            slot-scope="text, record"
            class="table-form__input"
          >
            <div>
              {{ text }}
            </div>
            <div>
              {{ record.cid }}
            </div>
          </div>
          <div slot="batch" slot-scope="text, record" class="table-form__input">
            <div v-if="record.batch === null">
              N/A
            </div>
            <div v-else>
              {{ record.batch.name }}
            </div>
          </div>
          <div slot="status" slot-scope="text" class="table-form__input">
            <div v-if="text === 'wait'" class="print-status-container">
              <div class="print-row__status wait">
                <span> รอพิมพ์ใบจัดส่ง </span>
              </div>
            </div>
            <div v-else-if="text === 'print'" class="print-status-container">
              <div class="print-row__status print">
                <span> รอจัดส่ง </span>
              </div>
            </div>
            <div v-else-if="text === 'out'" class="print-status-container">
              <div class="print-row__status out">
                <span>รอรับสินค้า </span>
              </div>
            </div>
            <div v-else class="print-status-container">
              <div class="print-row__status received">
                <span> ได้รับเรียบร้อย </span>
              </div>
            </div>
          </div>
          <div slot="operation" class="table-form__input">
            <img :src="RightIcon" alt="RightIcon">
          </div>
        </a-table>
      </div>
    </div>
    <div v-if="update" class="print-button__container">
      <a-button class="print-button__cta cancel" @click="onCancelUpdate">
        <span> ยกเลิก </span>
      </a-button>
      <a-button
        class="print-button__cta submit"
        @click="visibleSubmitDialog = true"
      >
        <span> อัปเดตข้อมูล ({{ changedRows.length }}) </span>
      </a-button>
    </div>
    <a-modal
      v-model="visibleSubmitDialog"
      class="print-modal__container"
      centered
      :closable="false"
      :width="480"
    >
      <div class="print-modal__img">
        <img :src="BoxImg" alt="BoxImg">
      </div>
      <div class="print-modal__title">
        ยืนยันการอัปเดตข้อมูล
      </div>
      <div class="print-modal__subtitle">
        รายการสั่งซื้อจำนวน ({{ changedRows.length }}) รายการ
        กำลังจะถูกอัปเดตข้อมูลการพิมพ์ใบจัดส่ง
      </div>
      <template slot="footer">
        <div class="print-modal__footer">
          <a-button
            key="back"
            class="print-button__cta cancel"
            @click="visibleSubmitDialog = false"
          >
            ยกเลิก
          </a-button>
          <a-button
            key="submit"
            class="print-button__cta submit"
            type="primary"
            @click="onSave"
          >
            ยืนยัน
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
/* eslint-disable camelcase */
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'
import moment from 'moment'
import ShipmentModule from '~/store/shipment.module'
import CalendarSvg from '~/assets/icons/calendar.svg'
import FilterSvg from '~/assets/icons/filter.svg'
import RightSvg from '~/assets/icons/right-table.svg'
import BoxSvg from '~/assets/images/print/box.svg'
import {
  IColumns,
  columns,
  columnsWithOperation
} from '~/static/ShipmentColumns'
import { ShipmentLine } from '~/types/shipment.type'

interface IFilter {
  created_date: string
  batchName: string
  shipmentItem: string
}

@Component
export default class PrintTable extends Vue {
  @Prop({ required: true }) update!: boolean
  @Prop({ required: true }) search!: string
  @Prop({ required: true }) loading!: boolean
  @Prop({ required: true }) amount!: number
  @Prop({ required: true }) originalData!: ShipmentLine[]

  private CalendarIcon = CalendarSvg
  private FilterIcon = FilterSvg
  private RightIcon = RightSvg
  private BoxImg = BoxSvg

  data: ShipmentLine[] = this.originalData ? this.originalData : []
  selectedRowKeys: number[] = []
  changedRows: { id: number; status: boolean }[] = []
  visibleSubmitDialog: boolean = false

  filterForm: IFilter = {
    created_date: '',
    batchName: '',
    shipmentItem: ''
  }

  @Emit('cancel')
  onCancelUpdate () {
    this.importData()
    return false
  }

  @Emit('pageChange')
  handlePageChange (page: number) {
    return page
  }

  @Watch('search', { immediate: true, deep: true })
  onSearchChange () {
    this.filterForm.shipmentItem = this.search
  }

  @Watch('filterForm', { immediate: true, deep: true })
  onFilterChange () {
    this.filterData()
  }

  @Watch('tabKey', { immediate: true, deep: true })
  onTabChange () {
    this.importData()
  }

  @Watch('originalData', { immediate: true, deep: true })
  onOriginalChange () {
    this.importData()
  }

  get recordsLength (): number {
    return this.data.length
  }

  get exportBatchSelect (): string[] {
    return [
      ...new Set(
        this.originalData
          .filter(item => item.batch !== null)
          .map(item => item.batch!.name)
      )
    ]
  }

  get shipmentItemSelect () {
    return this.originalData
      .map(item => item.shipmentItem)
      .reduce<string[]>((accum, shipmentItem) => {
        if (shipmentItem.length > 0) {
          shipmentItem.forEach((item) => {
            if (!accum.includes(item.name)) {
              accum.push(item.name)
            }
          })
        }
        return accum
      }, [])
  }

  get tableColumns (): IColumns[] {
    if (this.update) { return columns }
    return columnsWithOperation
  }

  mounted () {
    this.importData()
  }

  importData () {
    this.data = this.originalData
    this.selectedRowKeys = this.originalData
      .filter(line => line.label_printed)
      .map(line => line.id)
    this.changedRows = []
  }

  onDateFilterChange (_date: object, dateString: string) {
    this.filterForm.created_date = dateString
  }

  handleBatchFilterChange (value: { key: string; value: string }) {
    this.filterForm.batchName = value.key
  }

  handleOrderedItemFilterChange (value: { key: string; value: string }) {
    this.filterForm.shipmentItem = value.key
  }

  filterData () {
    this.data = this.originalData.filter((row) => {
      const result: boolean[] = []
      Object.keys(this.filterForm).forEach((key) => {
        result.push(
          this.filterForm[key as keyof IFilter] !== ''
            ? this.filterFields(key, row)
            : true
        )
      })
      return result.every(Boolean)
    })
  }

  filterFields (key: string, row: ShipmentLine): boolean {
    if (key === 'created_date') {
      return (
        moment(row.created_date).format('YYYY-MM-DD') ===
        this.filterForm.created_date
      )
    }
    if (key === 'batchName') {
      if (row.batch !== null) {
        return row.batch.name === this.filterForm.batchName
      }
      return false
    }
    if (key === 'shipmentItem') {
      return row.shipmentItem
        .map(item => item.name)
        .includes(this.filterForm.shipmentItem)
    }
    if (key === 'searchRecord') {
      const columsDataIndex = this.tableColumns
        .filter(column => column.dataIndex)
        .map(column => column.dataIndex)
      const searchedArray = columsDataIndex.map(col =>
        String(row[col as keyof ShipmentLine]).includes(
          this.filterForm.shipmentItem
        )
      )
      return searchedArray.some(Boolean)
    }
    return false
    // return row[key as keyof ShipmentLine] === this.filterForm[key]
  }

  onSelectChange (selectedRowKeys: number[]) {
    this.selectedRowKeys = selectedRowKeys
  }

  handleSelectAllChange (
    selected: boolean,
    _selectedRows: ShipmentLine[],
    changedRows: ShipmentLine[]
  ) {
    changedRows.forEach((row) => {
      this.handleSelectChange(row, selected)
    })
  }

  handleSelectChange (record: ShipmentLine, selected: boolean) {
    const allChangeId: number[] = this.changedRows.map(item => item.id)
    const newSelect = {
      id: record.id,
      status: selected
    }
    if (allChangeId.includes(record.id)) {
      this.changedRows = this.changedRows
        .map(item => (item.id === record.id ? newSelect : item))
        .filter((mapped) => {
          const originalRow = this.originalData.find(
            item => item.id === mapped.id
          )
          return originalRow && originalRow.label_printed !== mapped.status
        })
    } else {
      this.changedRows.push(newSelect)
    }
  }

  goBack () {
    this.$router.go(-1)
  }

  onSave () {
    ShipmentModule.setPrintStatus({
      selectedRowKeys: this.filterStatus(true),
      printStatus: true
    })
    ShipmentModule.setPrintStatus({
      selectedRowKeys: this.filterStatus(false),
      printStatus: false
    })
    this.visibleSubmitDialog = false
    this.onPageChange({ current: 1 })
    this.onCancelUpdate()
  }

  onPageChange (page: {current: number}) {
    this.handlePageChange(page.current)
  }

  filterStatus (status: boolean) {
    return this.changedRows
      .filter(row => row.status === status)
      .map(filtered => filtered.id)
  }
}
</script>
