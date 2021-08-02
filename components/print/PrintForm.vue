<template>
  <div class="print-body">
    <div class="print-body__container">
      <div class="print-filter__container">
        <div class="print-filter__header">
          <img :src="FilterIcon" alt="FilterIcon" />
          <span> ตัวกรองข้อมูล </span>
        </div>
        <a-form layout="vertical">
          <div class="print-filter__form">
            <div class="date">
              <a-form-item label="วันและเวลาที่สั่ง">
                <a-date-picker @change="onDateFilterChange">
                  <div slot="suffixIcon">
                    <img :src="CalendarIcon" alt="CalendarIcon" />
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
                  <a-select-option value=""> All </a-select-option>
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
            <div class="package">
              <a-form-item label="สินค้าในรายการสั่งซื้อ">
                <a-select
                  label-in-value
                  :default-value="{ key: '' }"
                  @change="handleOrderedItemFilterChange"
                >
                  <a-select-option value=""> All </a-select-option>
                  <a-select-option value="Green Package">
                    Green Package
                  </a-select-option>
                  <a-select-option value="Yellow Package">
                    Yellow Package
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
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
          :columns="tableColumns"
          :data-source="data"
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
            <div v-if="record.batch === null">N/A</div>
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
      class="print-modal__container"
      v-model="visibleSubmitDialog"
      centered
      :closable="false"
      :width="480"
    >
      <div class="print-modal__img">
        <img :src="BoxImg" alt="BoxImg" />
      </div>
      <div class="print-modal__title">ยืนยันการพิมพ์ใบจัดส่ง</div>
      <div class="print-modal__subtitle">
        รายการสั่งซื้อจำนวน {{ updateAmount }} รายการกำลังจะถูกพิมพ์
      </div>
      <template slot="footer">
        <div class="print-modal__footer">
          <a-button
            class="print-button__cta cancel"
            key="back"
            @click="visibleSubmitDialog = false"
          >
            ยกเลิก
          </a-button>
          <a-button
            class="print-button__cta submit"
            key="submit"
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
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import CalendarSvg from '~/assets/icons/calendar.svg'
import FilterSvg from '~/assets/icons/filter.svg'
import BoxSvg from '~/assets/images/print/box.svg'
import CorrectSvg from '~/assets/icons/correct.svg'
import { IColumns, columns } from '~/static/ShipmentColumns'
import ShipmentModule from '~/store/shipment.module'
import { ShipmentBatch, ShipmentLine } from '~/types/shipment.type'

interface IFilter {
  created_date: string
  shipmentBatch: string
  shipmentItem: string
}

@Component
export default class PrintForm extends Vue {
  @Prop({ required: true }) search!: string
  @Prop({ required: true }) originalData!: ShipmentLine[]

  private BoxImg = BoxSvg
  private CalendarIcon = CalendarSvg
  private FilterIcon = FilterSvg
  private CorrectIcon = CorrectSvg

  data: ShipmentLine[] = []

  filterForm: IFilter = {
    created_date: '',
    shipmentBatch: '',
    shipmentItem: '',
  }

  selectedRowKeys: number[] = []

  visibleSubmitDialog: boolean = false

  @Watch('search', { immediate: true, deep: true })
  onSearchChange() {
    this.filterForm.shipmentItem = this.search
  }

  @Watch('filterForm', { immediate: true, deep: true })
  onFilterChange() {
    this.filterData()
  }

  @Watch('originalData', { immediate: true, deep: true })
  onOriginalChange() {
    this.importData()
  }

  get recordsLength(): number {
    return this.data.length
  }

  get exportBatchSelect(): (ShipmentBatch | null)[] {
    return [
      ...new Set(
        this.originalData
          .map((item) => item.batch)
          .filter((mapped) => mapped !== null)
      ),
    ]
  }

  get updateAmount(): number {
    return this.data.filter((item) => {
      const orignalItem = this.originalData.find(
        (original) => original.id === item.id
      )
      if (orignalItem) {
        return orignalItem.label_printed
          ? !this.selectedRowKeys.includes(orignalItem.id)
          : this.selectedRowKeys.includes(orignalItem.id)
      }
      return false
    }).length
  }

  get tableColumns(): IColumns[] {
    return columns
  }

  importData() {
    this.data = this.originalData
  }

  onDateFilterChange(_date: object, dateString: string) {
    this.filterForm.created_date = dateString
  }

  handleBatchFilterChange(value: { key: string; value: string }) {
    this.filterForm.shipmentBatch = value.key
  }

  handleOrderedItemFilterChange(value: { key: string; value: string }) {
    this.filterForm.shipmentItem = value.key
  }

  filterData() {
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

  filterFields(key: string, row: ShipmentLine): boolean {
    if (key === 'orderedDate') {
      return (
        moment(row.created_date).format('YYYY-MM-DD') ===
        this.filterForm.created_date
      )
    }
    if (key === 'searchRecord') {
      const columsDataIndex = this.tableColumns
        .filter((column) => column.dataIndex)
        .map((column) => column.dataIndex)
      const searchedArray = columsDataIndex.map((col) =>
        String(row[col as keyof ShipmentLine]).includes(
          this.filterForm.shipmentItem
        )
      )
      return searchedArray.some(Boolean)
    }
    return false
    // return row[key as keyof ShipmentLine] === this.filterForm[key]
  }

  onSelectChange(selectedRowKeys: number[]) {
    this.selectedRowKeys = selectedRowKeys
  }

  goBack() {
    this.$router.go(-1)
  }

  onSave() {
    ShipmentModule.printLabel(this.selectedRowKeys)
    this.visibleSubmitDialog = false
    this.$router.push(`/order-overview`)
  }
}
</script>
