<template>
  <div class="assign-body">
    <div class="assign-body__container">
      <div class="assign-body__header">
        กรุณาเลือกรายการสั่งซื้อเพื่อเพิ่มลงในล็อตการจัดส่ง
        <span>{{ batchNo }}</span>
      </div>
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
            current:currentPage,
            pageSizeOptions:['10','200', '300', '400', String(amount)]
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
            <div class="sub-detail__info">
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
            <div class="sub-detail__info">
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
        </a-table>
      </div>
    </div>
    <!-- visibleSubmitDialog -->
    <a-modal
      v-model="visibleSubmitDialog"
      class="assign-modal__container"
      centered
      :closable="false"
      :width="480"
    >
      <div class="assign-modal__img">
        <img :src="BoxImg" alt="BoxImg">
      </div>
      <div class="assign-modal__title">
        ยืนยันการสร้างล็อตการจัดส่ง
      </div>
      <div class="assign-modal__subtitle">
        รายการสั่งซื้อจำนวน
        {{ selectedRowKeys.length }} รายการกำลังจะถูกเพิ่มลงในล็อตการจัดส่ง
        <span>{{ batchNo }}</span>
      </div>
      <template slot="footer">
        <div class="assign-modal__footer">
          <a-button
            key="back"
            class="assign-button__cta cancel"
            @click="onSaveSelection"
          >
            ยกเลิก
          </a-button>
          <a-button
            key="submit"
            class="assign-button__cta submit"
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
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'
import moment from 'moment'
import CalendarSvg from '~/assets/icons/calendar.svg'
import FilterSvg from '~/assets/icons/filter.svg'
import BoxSvg from '~/assets/images/print/box.svg'
import ShipmentModule from '~/store/shipment.module'
import { ShipmentLine } from '~/types/shipment.type'
import { IColumns, columns } from '~/static/ShipmentColumns'
import { getBatchNumber } from '~/services/shipment.service'

interface IFilter {
  created_date: string
  shipmentItem: string
}

@Component
export default class AssignForm extends Vue {
  @Prop({ required: true }) originalData!: ShipmentLine[]
  @Prop({ required: true }) loading!: boolean
  @Prop({ required: true }) amount!: number
  @Prop({ required: true }) save!: boolean

  private FilterIcon = FilterSvg
  private BoxImg = BoxSvg
  private CalendarIcon = CalendarSvg

  batchNo: string = ''
  data: ShipmentLine[] = this.originalData ? this.originalData : []
  visibleSubmitDialog: boolean = false

  filterForm: IFilter = {
    created_date: '',
    shipmentItem: ''
  }

  selectedRowKeys: number[] = []

  search: string = ''

  currentPage: number = 1
  pageSize:number = 10

  @Emit('pageChange')
  handlePageChange (page: number, page_size: number) {
    return { page, page_size }
  }

  @Emit('saveSelection')
  onSaveSelection () {
    return false
  }

  @Emit('selectedKeys')
  sendKeysChange (selectedRowKeys: number[]) {
    return selectedRowKeys
  }

  @Watch('filterForm', { immediate: true, deep: true })
  onFilterChange () {
    this.filterData()
  }

  @Watch('originalData', { immediate: true, deep: true })
  onOriginalChange () {
    this.data = this.originalData
  }

  @Watch('save', { immediate: true, deep: true })
  onSaveChange () {
    this.visibleSubmitDialog = this.save
  }

  get recordsLength (): number {
    return this.data.length
  }

  get canSave () {
    return this.batchNo !== '' && this.selectedRowKeys.length > 0
  }

  get tableColumns (): IColumns[] {
    return columns
  }

  get queryType () {
    return this.$route.query.type
  }

  async created () {
    this.batchNo = await getBatchNumber()
  }

  onDateFilterChange (_date: object, dateString: string) {
    this.filterForm.created_date = dateString
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
    ShipmentModule.setSelectedKeys(selectedRowKeys)
    this.sendKeysChange(selectedRowKeys)
  }

  onPageChange (page: {current: number; pageSize: number}) {
    this.pageSize = page.pageSize
    this.currentPage = page.current
    this.handlePageChange(page.current, page.pageSize)
  }

  goBack () {
    this.$router.go(-1)
  }

  async onSave () {
    await ShipmentModule.updateBatch({
      batchNo: this.batchNo,
      selectedRowKeys: ShipmentModule.getSelectedKeys
    })
    this.currentPage = 1
    this.onSaveSelection()
    this.$router.push('/assign')
    ShipmentModule.setSelectedKeys([])
  }
}
</script>

<style scoped>
.button-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
