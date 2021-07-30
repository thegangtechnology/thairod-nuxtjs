<template>
  <div class="overview-body">
    <div class="overview-body__container">
      <div class="overview-filter__container">
        <div class="overview-filter__header">
          <img :src="FilterIcon" alt="FilterIcon" />
          <span> ตัวกรองข้อมูล </span>
        </div>
        <a-form layout="vertical">
          <div class="overview-filter__form">
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
      <div class="overview-table__container">
        <div class="overview-table__status">
          Displaying {{ recordsLength }} records
        </div>
        <div class="overview-table__table">
          <a-table
            row-key="orderId"
            :row-selection="
              option === 'default'
                ? null
                : {
                    selectedRowKeys: selectedRowKeys,
                    onChange: onSelectChange,
                  }
            "
            :columns="columns"
            :data-source="data"
            :custom-row="customRow"
          >
            <div
              slot="orderId"
              slot-scope="text, record"
              class="table-form__input"
            >
              <div>
                {{ record.orderId }}
              </div>
              <div>
                {{ record.orderedDate }}
              </div>
            </div>
            <div slot="status" slot-scope="text" class="table-form__input">
              <div v-if="text === 'wait'" class="overview-row__status">
                รอพิมพ์ใบจัดส่ง
              </div>
              <div v-else-if="text === 'print'" class="overview-row__status">
                รอจัดส่ง
              </div>
              <div v-else-if="text === 'out'" class="overview-row__status">
                รอรับสินค้า
              </div>
              <div v-else>ได้รับเรียบร้อย</div>
            </div>
            <div slot="operation" class="table-form__input">
              <img :src="RightIcon" alt="RightIcon" />
            </div>
          </a-table>
        </div>
      </div>
    </div>
    <div v-if="option !== 'default'" class="overview-button__container">
      <a-button class="overview-button__cta cancel">
        <!-- @click="goBack" -->
        <span> ยกเลิก </span>
      </a-button>
      <a-button
        class="overview-button__cta submit"
        @click="visibleSubmitDialog = true"
      >
        <span> อัปเดตข้อมูล </span>
        <!-- ({{ updateAmount }})  -->
      </a-button>
    </div>
    <a-modal
      v-model="visibleSubmitDialog"
      class="overview-modal__container"
      centered
      :closable="false"
      :width="480"
    >
      <div class="overview-modal__img">
        <img :src="BoxImg" alt="BoxImg" />
      </div>
      <div class="overview-modal__title">ยืนยันการอัปเดตข้อมูล</div>
      <div class="overview-modal__subtitle">
        รายการสั่งซื้อจำนวน 3 รายการกำลังจะถูกอัปเดตข้อมูลการพิมพ์ใบจัดส่งจาก
        {{ getModalDescription.from }} เป็น
        <span>{{ getModalDescription.to }} </span>
      </div>
      <template slot="footer">
        <div class="overview-modal__footer">
          <a-button
            key="back"
            class="overview-button__cta cancel"
            @click="visibleSubmitDialog = false"
          >
            Cancel
          </a-button>
          <a-button
            key="submit"
            class="overview-button__cta submit"
            type="primary"
            @click="onSave"
          >
            Confirm
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import moment from 'moment'
import CalendarSvg from '~/assets/icons/calendar.svg'
import FilterSvg from '~/assets/icons/filter.svg'
import CorrectSvg from '~/assets/icons/correct.svg'
import RightSvg from '~/assets/icons/right-table.svg'
import BoxSvg from '~/assets/images/print/box.svg'
import { OrderModule } from '~/store'

type Status = 'wait' | 'print' | 'out' | 'received'

interface IMain {
  [key: string]: string
}

interface IFilter extends IMain {
  orderedDate: string
  exportBatch: string
  orderedItem: string
  searchRecord: string
}

interface IOrder {
  orderId: number
  cid: string
  patientName: string
  orderedItem: string
  orderedDate: string
  exportBatch: string
  trackingNo: string
  status: Status
}

@Component
export default class OverviewTable extends Vue {
  @Prop({ required: true }) originalData!: IOrder[]
  @Prop({ required: true }) option!: string
  @Prop({ required: true }) search!: string
  @Prop({ required: true }) tabKey!: string

  private CalendarIcon = CalendarSvg
  private FilterIcon = FilterSvg
  private CorrectIcon = CorrectSvg
  private RightIcon = RightSvg
  private BoxImg = BoxSvg

  columns = [
    {
      title: 'เลขที่รายการสั่งซื้อ',
      scopedSlots: { customRender: 'orderId' },
    },
    {
      title: 'รายการสินค้า',
      dataIndex: 'orderedItem',
    },
    {
      title: 'จำนวน',
    },
    {
      title: 'ผู้รับการรักษา',
      dataIndex: 'patientName',
    },
    {
      title: 'ล็อตการจัดส่ง',
      dataIndex: 'exportBatch',
    },
    {
      title: 'สถานะการจัดส่ง',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' },
    },
    {
      title: 'หมายเลขติดตาม',
      dataIndex: 'trackingNo',
    },
    {
      key: 'operation',
      scopedSlots: { customRender: 'operation' },
    },
  ]

  data: IOrder[] = []
  selectedRowKeys: number[] = []
  originalSelectedRowKeys: number[] = []
  visibleSubmitDialog: boolean = false

  filterForm: IFilter = {
    orderedDate: '',
    exportBatch: '',
    orderedItem: '',
    searchRecord: '',
  }

  @Watch('search', { immediate: true, deep: true })
  onSearchChange() {
    this.filterForm.searchRecord = this.search
  }

  @Watch('filterForm', { immediate: true, deep: true })
  onFilterChange() {
    this.filterData()
  }

  @Watch('tabKey', { immediate: true, deep: true })
  onTabChange() {
    this.importData()
  }

  @Watch('originalData', { immediate: true, deep: true })
  onOriginalChange() {
    this.importData()
  }

  @Watch('option', { immediate: true, deep: true })
  onOptionChange() {
    this.initSelect()
  }

  get recordsLength(): number {
    return this.data.length
  }

  get exportBatchSelect(): string[] {
    return [...new Set(this.originalData.map((item) => item.exportBatch))]
  }

  get unselectedIds() {
    return this.data
      .filter((item) => !this.selectedRowKeys.includes(item.orderId))
      .map((filtered) => filtered.orderId)
  }

  get getModalDescription() {
    if (this.option === 'updatePrint') {
      if (this.tabKey === 'wait') {
        return { from: 'รอพิมพ์ใบจัดส่ง', to: 'รอจัดส่ง' }
      } else {
        return { from: 'รอจัดส่ง', to: 'รอพิมพ์ใบจัดส่ง' }
      }
    }
    if (this.option === 'updateDelivery') {
      if (this.tabKey === 'print') {
        return { from: 'รอจัดส่ง', to: 'รอรับสินค้า' }
      } else {
        return { from: 'รอรับสินค้า', to: 'รอจัดส่ง' }
      }
    }
    if (this.option === 'updateReceived') {
      if (this.tabKey === 'out') {
        return { from: 'รอรับสินค้า', to: 'ได้รับเรียบร้อย' }
      } else {
        return { from: 'ได้รับเรียบร้อย', to: 'รอรับสินค้า' }
      }
    }
    return { from: '', to: '' }
  }

  mounted() {
    this.importData()
  }

  importData() {
    this.data = this.originalData
  }

  initSelect() {
    this.originalSelectedRowKeys = this.originalData
      .filter((item) => {
        return this.handleCondition(item.status)
      })
      .map((filtered) => filtered.orderId)
    this.selectedRowKeys = this.originalSelectedRowKeys
  }

  handleCondition(status: Status) {
    if (this.option === 'updatePrint') {
      return status === 'print'
    }
    if (this.option === 'updateDelivery') {
      return status === 'out'
    }
    if (this.option === 'updateReceived') {
      return status === 'received'
    }
    return true
  }

  onDateFilterChange(_date: object, dateString: string) {
    this.filterForm.orderedDate = dateString
  }

  handleBatchFilterChange(value: { key: string; value: string }) {
    this.filterForm.exportBatch = value.key
  }

  handleOrderedItemFilterChange(value: { key: string; value: string }) {
    this.filterForm.orderedItem = value.key
  }

  filterData() {
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

  filterFields(key: string, row: IOrder): boolean {
    if (key === 'orderedDate') {
      return (
        moment(row.orderedDate).format('YYYY-MM-DD') ===
        this.filterForm.orderedDate
      )
    }
    if (key === 'searchRecord') {
      const columsDataIndex = this.columns
        .filter((column) => column.dataIndex)
        .map((column) => column.dataIndex)
      const searchedArray = columsDataIndex.map((col) =>
        String(row[col as keyof IOrder]).includes(this.filterForm.searchRecord)
      )
      return searchedArray.some(Boolean)
    }
    return row[key as keyof IOrder] === this.filterForm[key]
  }

  handleUpdatePrint() {
    /**
     * If tab === 'wait' => change selected to 'print' status
     * If tab === 'print' => change unselected to 'wait' status
     */
    if (this.tabKey === 'wait') {
      this.saveToStore(this.selectedRowKeys, 'print')
    } else {
      this.saveToStore(this.unselectedIds, 'wait')
    }
  }

  handleUpdateDelievery() {
    /**
     * If tab === 'print' => change selected to 'out' status
     * If tab === 'out' => change unselected to 'print' status
     */
    if (this.tabKey === 'print') {
      this.saveToStore(this.selectedRowKeys, 'out')
    } else {
      this.saveToStore(this.unselectedIds, 'print')
    }
  }

  handleUpdateReceived() {
    /**
     * If tab === 'out' => change selected to 'received' status
     * If tab === 'received' => change unselected to 'out' status
     */
    if (this.tabKey === 'out') {
      this.saveToStore(this.selectedRowKeys, 'received')
    } else {
      this.saveToStore(this.unselectedIds, 'out')
    }
  }

  saveToStore(ids: number[], status: Status) {
    OrderModule.updateStatus({ status, selectedRows: ids })
  }

  onSave() {
    if (this.option === 'updatePrint') this.handleUpdatePrint()
    if (this.option === 'updateDelivery') this.handleUpdateDelievery()
    if (this.option === 'updateReceived') this.handleUpdateReceived()
    this.visibleSubmitDialog = false
  }

  onSelectChange(selectedRowKeys: number[]) {
    this.selectedRowKeys = selectedRowKeys
  }

  customRow(record: IOrder) {
    return {
      on: {
        click: () => {
          this.$router.push(`/order-overview/${record.orderId}`)
        },
      },
    }
  }
}
</script>
