<template>
  <div class="assign-body">
    <div class="assign-body__container">
      <div class="assign-filter__container">
        <div class="assign-filter__header">
          <img :src="FilterIcon" alt="FilterIcon">
          <span> ตัวกรองข้อมูล </span>
        </div>
        <a-form layout="vertical">
          <div class="assign-filter__form">
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
          </div>
        </a-form>
      </div>
      <div class="assign-table__container">
        <div class="assign-table__table">
          <a-table
            row-key="id"
            :columns="tableColumns"
            :data-source="data"
            :pagination="{
              total: amount,
            }"
            :custom-row="customRow"
            :loading="loading"
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
            <div
              slot="batch"
              slot-scope="text, record"
              class="table-form__input"
            >
              <div v-if="record.batch === null">
                N/A
              </div>
              <div v-else>
                {{ record.batch.name }}
              </div>
            </div>
            <div slot="status" slot-scope="text" class="table-form__input">
              <div v-if="text === 'wait'" class="assign-status-container">
                <div class="assign-row__status wait">
                  <span> รอพิมพ์ใบจัดส่ง </span>
                </div>
              </div>
              <div v-else-if="text === 'print'" class="assign-status-container">
                <div class="assign-row__status print">
                  <span> รอจัดส่ง </span>
                </div>
              </div>
              <div v-else-if="text === 'out'" class="assign-status-container">
                <div class="assign-row__status out">
                  <span>รอรับสินค้า </span>
                </div>
              </div>
              <div v-else class="assign-status-container">
                <div class="assign-row__status received">
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
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'
import moment from 'moment'
import CalendarSvg from '~/assets/icons/calendar.svg'
import FilterSvg from '~/assets/icons/filter.svg'
import RightSvg from '~/assets/icons/right-table.svg'
import { IColumns, columnsWithOperation } from '~/static/ShipmentColumns'
import { Batch, ShipmentLine } from '~/types/shipment.type'

interface IMain {
  [key: string]: string
}

interface IFilter extends IMain {
  orderedDate: string
  orderedItem: string
  searchRecord: string
}

@Component
export default class AssignOverview extends Vue {
  @Prop({ required: true }) originalData!: ShipmentLine[]
  @Prop({ required: true }) loading!: boolean
  @Prop({ required: true }) amount!: number

  private CalendarIcon = CalendarSvg
  private FilterIcon = FilterSvg
  private RightIcon = RightSvg

  tabKey: string = 'All'

  data: ShipmentLine[] = this.originalData ? this.originalData : []

  filterForm: IFilter = {
    orderedDate: '',
    orderedItem: '',
    searchRecord: ''
  }

  @Emit('pageChange')
  handlePageChange (page: number) {
    return page
  }

  @Watch('filterForm', { immediate: true, deep: true })
  onFilterChange () {
    this.filterData()
  }

  @Watch('originalData', { immediate: true, deep: true })
  onOriginalChange () {
    this.data = this.originalData
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

  get tableColumns (): IColumns[] {
    return columnsWithOperation
  }

  onTabChange (key: string) {
    this.tabKey = key
  }

  onDateFilterChange (_date: object, dateString: string) {
    this.filterForm.orderedDate = dateString
  }

  handleBatchFilterChange (value: { key: string; value: string }) {
    this.filterForm.exportBatch = value.key
  }

  handleOrderedItemFilterChange (value: { key: string; value: string }) {
    this.filterForm.orderedItem = value.key
  }

  onSearchRecords (value: string) {
    this.filterForm.searchRecord = value
  }

  filterData () {
    this.data = this.originalData.filter((row) => {
      const result: boolean[] = []
      Object.keys(this.filterForm).forEach((key) => {
        result.push(
          this.filterForm[key] !== '' ? this.filterFields(key, row) : true
        )
      })
      return result.every(Boolean)
    })
  }

  filterFields (key: string, row: ShipmentLine): boolean {
    if (key === 'orderedDate') {
      return (
        moment(row.created_date).format('YYYY-MM-DD') ===
        this.filterForm.orderedDate
      )
    }
    if (key === 'searchRecord') {
      const columsDataIndex = this.tableColumns
        .filter(column => column.dataIndex)
        .map(column => column.dataIndex)
      const searchedArray = columsDataIndex.map(col =>
        String(row[col as keyof ShipmentLine]).includes(
          this.filterForm.searchRecord
        )
      )
      return searchedArray.some(Boolean)
    }
    return row[key as keyof ShipmentLine] === this.filterForm[key]
  }

  onPageChange (page: {current: number}) {
    this.handlePageChange(page.current)
  }

  customRow (record: ShipmentLine) {
    return {
      on: {
        click: () => {
          this.$router.push(`/order-overview/${record.id}`)
        }
      }
    }
  }
}
</script>
