<template>
  <div class="assign-body">
    <div class="assign-body__container">
      <div class="assign-body__header">
        กรุณาเลือกรายการสั่งซื้อเพื่อเพิ่มลงในล็อตการจัดส่ง
        <span>{{ batchNo }}</span>
      </div>
      <div class="assign-filter__container">
        <div class="assign-filter__header">
          <img :src="FilterIcon" alt="FilterIcon">
          <span> ตัวกรองข้อมูล </span>
        </div>
        <a-form layout="vertical">
          <div class="assign-filter__form">
            <div class="date">
              <a-form-item label="วันและเวลาที่สั่ง">
                <a-input placeholder="input search text" />
              </a-form-item>
            </div>
            <div class="package">
              <a-form-item label="สินค้าในรายการสั่งซื้อ">
                <a-input placeholder="input search text" />
              </a-form-item>
            </div>
          </div>
        </a-form>
      </div>
      <div class="assign-table__container">
        <a-table
          row-key="id"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
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
    <div class="assign-button__container">
      <a-button class="assign-button__cta cancel" @click="goBack">
        <span> ยกเลิก </span>
      </a-button>
      <a-button
        class="assign-button__cta submit"
        :disabled="selectedRowKeys.length === 0"
        @click="visibleSubmitDialog = true"
      >
        <span v-if="queryType"> อัปเดต ({{ selectedRowKeys.length }}) </span>
        <span v-else> สร้าง ({{ selectedRowKeys.length }}) </span>
      </a-button>
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
            @click="visibleSubmitDialog = false"
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
import FilterSvg from '~/assets/icons/filter.svg'
import BoxSvg from '~/assets/images/print/box.svg'
import ShipmentModule from '~/store/shipment.module'
import { ShipmentLine } from '~/types/shipment.type'
import { IColumns, columns } from '~/static/ShipmentColumns'
import { getBatchNumber } from '~/services/shipment'

interface IMain {
  [key: string]: string
}

interface IFilter extends IMain {
  orderedDateStart: string
  orderedDateEnd: string
}

@Component
export default class AssignForm extends Vue {
  @Prop({ required: true }) originalData!: ShipmentLine[]
  @Prop({ required: true }) loading!: boolean
  @Prop({ required: true }) amount!: number

  private FilterIcon = FilterSvg
  private BoxImg = BoxSvg

  tabKey: string = 'All'
  batchNo: string = ''
  data: ShipmentLine[] = this.originalData ? this.originalData : []
  visibleSubmitDialog: boolean = false

  filterForm: IFilter = {
    orderedDateStart: '',
    orderedDateEnd: ''
  }

  selectedRowKeys: number[] = []

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

  onTabChange (key: string) {
    this.tabKey = key
  }

  onDateFilterChange (_date: moment.Moment[], dateString: string[]) {
    this.filterForm.orderedDateStart = dateString[0]
    this.filterForm.orderedDateEnd = dateString[1]
  }

  filterData () {
    this.data = this.originalData.filter((row) => {
      return moment(row.created_date).isBetween(
        this.filterForm.orderedDateStart,
        this.filterForm.orderedDateEnd,
        'day',
        '[]'
      )
    })
  }

  onSelectChange (selectedRowKeys: number[]) {
    this.selectedRowKeys = selectedRowKeys
  }

  onPageChange (page: {current: number}) {
    this.handlePageChange(page.current)
  }

  goBack () {
    this.$router.go(-1)
  }

  async onSave () {
    await ShipmentModule.updateBatch({
      batchNo: this.batchNo,
      selectedRowKeys: this.selectedRowKeys
    })
    this.$router.push('/assign')
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
