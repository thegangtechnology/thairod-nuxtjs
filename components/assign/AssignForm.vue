<template>
  <div class="overview-container">
    <a-form layout="vertical">
      <a-row>
        <a-col :span="4">
          <a-form-item label="Export Batch No.">
            <a-input
              v-model="batchNo"
              placeholder="Batch No."
              style="width: 200px"
            />
            <!-- @search="onSearchRecords" -->
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item label="Select Date Range">
            <a-range-picker @change="onDateFilterChange" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="overview-table__container">
      <div class="overview-table__table">
        <a-table
          row-key="orderId"
          :row-selection="rowSelection"
          :columns="columns"
          :data-source="data"
        >
          <div slot="operation" class="table-form__input">
            <a-icon type="right-circle" />
          </div>
        </a-table>
      </div>
    </div>

    <div class="button-container">
      <div class="button-right">
        <a-button @click="goBack">Cancel</a-button>
        <a-button
          :disabled="!canSave"
          type="primary"
          @click="visibleSaveModal = true"
          >Save</a-button
        >
      </div>
    </div>
    <!-- Save Modal -->

    <a-modal v-model="visibleSaveModal" centered :closable="false">
      <div class="modal__title">Confirm Save?</div>
      <div class="modal__subtitle">
        {{ selectedRows.length }} record(s) will be assigned to {{ batchNo }}
      </div>
      <template slot="footer">
        <div class="flex justify-center">
          <a-button key="back" @click="visibleSaveModal = false">
            Cancel
          </a-button>
          <a-button key="submit" type="primary" @click="onSave">
            Confirm
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { ShipmentModule } from '~/store'
import { IOrder } from '~/types/order.type'

interface IMain {
  [key: string]: string
}

interface IFilter extends IMain {
  orderedDateStart: string
  orderedDateEnd: string
}

@Component
export default class AssignOverview extends Vue {
  @Prop({ required: true }) originalData!: IOrder[]

  tabKey: string = 'All'

  batchNo: string = ''

  data: IOrder[] = this.originalData ? this.originalData : []

  visibleSaveModal: boolean = false

  columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
    },
    {
      title: 'CID',
      dataIndex: 'cid',
    },
    {
      title: 'Patient Name',
      dataIndex: 'patientName',
    },
    {
      title: 'Ordered Item',
      dataIndex: 'orderedItem',
    },
    {
      title: 'Ordered Date',
      dataIndex: 'orderedDate',
    },
    {
      title: 'Export Batch',
      dataIndex: 'exportBatch',
    },
  ]

  filterForm: IFilter = {
    orderedDateStart: '',
    orderedDateEnd: '',
  }

  selectedRows: string[] = []

  @Watch('filterForm', { immediate: true, deep: true })
  onFilterChange() {
    this.filterData()
  }

  @Watch('originalData', { immediate: true, deep: true })
  onOriginalChange() {
    this.data = this.originalData
  }

  get recordsLength(): number {
    return this.data.length
  }

  get rowSelection() {
    return {
      onChange: (selectedRowKeys: any, _selectedRows: any) => {
        this.selectedRows = selectedRowKeys
      },
      getCheckboxProps: (record: any) => ({
        props: {
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        },
      }),
    }
  }

  get canSave() {
    return this.batchNo !== '' && this.selectedRows.length > 0
  }

  onTabChange(key: string) {
    this.tabKey = key
  }

  onDateFilterChange(_date: moment.Moment[], dateString: string[]) {
    this.filterForm.orderedDateStart = dateString[0]
    this.filterForm.orderedDateEnd = dateString[1]
  }

  filterData() {
    this.data = this.originalData.filter((row) => {
      return moment(row.orderedDate).isBetween(
        this.filterForm.orderedDateStart,
        this.filterForm.orderedDateEnd,
        'day',
        '[]'
      )
    })
  }

  goBack() {
    this.$router.go(-1)
  }

  onSave() {
    ShipmentModule.updateExportBatch({
      batchNo: this.batchNo,
      selectedRows: this.selectedRows,
    })
    this.$router.push(`/order-overview`)
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
