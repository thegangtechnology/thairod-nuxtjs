<template>
  <div class="print-body">
    <div class="print-body__container">
      <div class="shipment-filter__container">
        <a-form layout="vertical">
          <div class="shipment-filter__form">
            <a-row :gutter="16">
              <a-col :md="4" :sm="24">
                <div class="filter-input__container">
                  <a-form-item label="วันและเวลาที่สั่ง">
                    <a-date-picker @change="onDateFilterChange">
                      <div slot="suffixIcon">
                        <img :src="CalendarIcon" alt="CalendarIcon">
                      </div>
                    </a-date-picker>
                  </a-form-item>
                </div>
              </a-col>

              <a-col :md="6" :sm="24">
                <div class="filter-input__container">
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
                        :key="batch.id"
                        :value="batch.name"
                      >
                        {{ batch.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </a-col>

              <a-col :md="6" :sm="24">
                <div class="filter-input__container">
                  <a-form-item label="สินค้าในรายการสั่งซื้อ">
                    <a-select
                      label-in-value
                      :default-value="{ key: '' }"
                      @change="handleOrderedItemFilterChange"
                    >
                      <a-select-option value="">
                        All
                      </a-select-option>
                      <a-select-option value="Green Package">
                        Green Package
                      </a-select-option>
                      <a-select-option value="Yellow Package">
                        Yellow Package
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </a-col>

              <a-col :md="8" :sm="24">
                <div class="filter-input__container">
                  <a-form-item label="ค้นหารายการสั่งซื้อ">
                    <a-input
                      v-model="search"
                      class="page-header__search"
                      placeholder="ค้นหา"
                    >
                      <a-icon slot="prefix" type="search" />
                    </a-input>
                  </a-form-item>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-form>
      </div>
      <div class="shipment-table__container">
        <a-table
          row-key="id"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
          :pagination="{
            total: amount,
            position:'top',
            showSizeChanger:true,
            pageSize:pageSize,
            pageSizeOptions:['10','20', '30', '40', String(amount)]
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
        </a-table>
      </div>
    </div>
    <div class="print-button__container">
      <a-button class="print-button__cta cancel" @click="goBack">
        <span> ยกเลิก </span>
      </a-button>
      <a-button
        class="print-button__cta submit"
        :disabled="updateAmount === 0"
        @click="visibleSubmitDialog = true"
      >
        <span> พิมพ์ ({{ updateAmount }}) </span>
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
        ยืนยันการพิมพ์ใบจัดส่ง
      </div>
      <div class="print-modal__subtitle">
        รายการสั่งซื้อจำนวน {{ updateAmount }} รายการกำลังจะถูกพิมพ์
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
import moment from 'moment'
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'
import CalendarSvg from '~/assets/icons/calendar.svg'
import FilterSvg from '~/assets/icons/filter.svg'
import BoxSvg from '~/assets/images/print/box.svg'
import CorrectSvg from '~/assets/icons/correct.svg'
import { IColumns, columns } from '~/static/ShipmentColumns'
import ShipmentModule from '~/store/shipment.module'
import { Batch, ShipmentLine } from '~/types/shipment.type'

interface IFilter {
  created_date: string
  shipmentBatch: string
  shipmentItem: string
}

@Component
export default class PrintForm extends Vue {
  @Prop({ required: true }) loading!: boolean
  @Prop({ required: true }) amount!: number
  @Prop({ required: true }) originalData!: ShipmentLine[]

  private BoxImg = BoxSvg
  private CalendarIcon = CalendarSvg
  private FilterIcon = FilterSvg
  private CorrectIcon = CorrectSvg

  data: ShipmentLine[] = []

  filterForm: IFilter = {
    created_date: '',
    shipmentBatch: '',
    shipmentItem: ''
  }

  selectedRowKeys: number[] = []

  visibleSubmitDialog: boolean = false

  search: string = ''

  pageSize:number = 10

  @Emit('pageChange')
  handlePageChange (page: number, page_size: number) {
    return { page, page_size }
  }

  @Watch('search', { immediate: true, deep: true })
  onSearchChange () {
    this.filterForm.shipmentItem = this.search
  }

  @Watch('filterForm', { immediate: true, deep: true })
  onFilterChange () {
    this.filterData()
  }

  @Watch('originalData', { immediate: true, deep: true })
  onOriginalChange () {
    this.importData()
  }

  get recordsLength (): number {
    return this.data.length
  }

  get exportBatchSelect (): (Batch | null)[] {
    return [
      ...new Set(
        this.originalData
          .map(item => item.batch)
          .filter(mapped => mapped !== null)
      )
    ]
  }

  get updateAmount (): number {
    return this.data.filter((item) => {
      const orignalItem = this.originalData.find(
        original => original.id === item.id
      )
      if (orignalItem) {
        return orignalItem.label_printed
          ? !this.selectedRowKeys.includes(orignalItem.id)
          : this.selectedRowKeys.includes(orignalItem.id)
      }
      return false
    }).length
  }

  get tableColumns (): IColumns[] {
    return columns
  }

  importData () {
    this.data = this.originalData
  }

  onDateFilterChange (_date: object, dateString: string) {
    this.filterForm.created_date = dateString
  }

  handleBatchFilterChange (value: { key: string; value: string }) {
    this.filterForm.shipmentBatch = value.key
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
    if (key === 'orderedDate') {
      return (
        moment(row.created_date).format('YYYY-MM-DD') ===
        this.filterForm.created_date
      )
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

  goBack () {
    this.$router.go(-1)
  }

  onSave () {
    ShipmentModule.printLabel(this.selectedRowKeys)
    this.visibleSubmitDialog = false
    this.$router.push('/print')
  }

  onPageChange (page: {current: number; pageSize: number}) {
    this.pageSize = page.pageSize
    this.handlePageChange(page.current, page.pageSize)
  }
}
</script>
