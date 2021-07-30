<template>
  <div class="overview-container">
    <a-form layout="vertical">
      <a-row>
        <a-col :span="6">
          <a-form-item label="Ordered Date">
            <a-date-picker @change="onDateFilterChange" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="Export Batch">
            <a-select
              label-in-value
              :default-value="{ key: '' }"
              style="width: 200px"
              :disabled="tabKey === 'Wait'"
              @change="handleBatchFilterChange"
            >
              <a-select-option value=""> All </a-select-option>
              <a-select-option v-if="tabKey === 'All'" value="Unassigned">
                Unassigned
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
        </a-col>
        <a-col :span="6">
          <a-form-item label="Ordered Item">
            <a-select
              label-in-value
              :default-value="{ key: '' }"
              style="width: 200px"
              @change="handleOrderedItemFilterChange"
            >
              <a-select-option value="">All</a-select-option>
              <a-select-option value="Green Package">
                Green Package
              </a-select-option>
              <a-select-option value="Yellow Package">
                Yellow Package
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="Search Record">
            <a-input-search
              placeholder="input search text"
              style="width: 200px"
              @search="onSearchRecords"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="overview-table__container">
      <div class="overview-table__status">
        Displaying {{ recordsLength }} records
      </div>
      <div class="overview-table__table">
        <a-table
          row-key="orderId"
          :columns="columns"
          :data-source="data"
          :custom-row="customRow"
        >
          <div slot="operation" class="table-form__input">
            <a-icon type="right-circle" />
          </div>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import moment from "moment";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { OrderModule } from "~/store";

interface IMain {
  [key: string]: string;
}

interface IFilter extends IMain {
  orderedDate: string;
  exportBatch: string;
  orderedItem: string;
  searchRecord: string;
}

interface IOrder {
  orderId: string;
  cid: string;
  patientName: string;
  orderedItem: string;
  orderedDate: string;
  exportBatch: string;
  trackingNo: string;
}

@Component
export default class OverviewTable extends Vue {
  @Prop({ required: true }) tabKey!: string;

  columns = [
    {
      title: "Order ID",
      dataIndex: "orderId"
    },
    {
      title: "CID",
      dataIndex: "cid"
    },
    {
      title: "Patient Name",
      dataIndex: "patientName"
    },
    {
      title: "Ordered Item",
      dataIndex: "orderedItem"
    },
    {
      title: "Ordered Date",
      dataIndex: "orderedDate"
    },
    {
      title: "Export Batch",
      dataIndex: "exportBatch"
    },
    {
      title: "Tracking No.",
      dataIndex: "trackingNo"
    },
    {
      key: "operation",
      scopedSlots: { customRender: "operation" }
    }
  ];

  data: IOrder[] = [];
  originalData: IOrder[] = [];

  filterForm: IFilter = {
    orderedDate: "",
    exportBatch: "",
    orderedItem: "",
    searchRecord: ""
  };

  @Watch("filterForm", { immediate: true, deep: true })
  onFilterChange() {
    this.filterData();
  }

  @Watch("tabKey", { immediate: true, deep: true })
  onTabChange() {
    this.importData();
  }

  get recordsLength(): number {
    return this.data.length;
  }

  get exportBatchSelect(): string[] {
    return [
      ...new Set(
        this.originalData
          .map(item => item.exportBatch)
          .filter(mapped => mapped !== "Unassigned")
      )
    ];
  }

  mounted() {
    this.importData();
  }

  importData() {
    const orderList = OrderModule.getOrderList;
    this.originalData =
      this.tabKey === "All" ? orderList : this.filterOriginalData(orderList);
    this.data = this.originalData;
  }

  filterOriginalData(orderList: IOrder[]): IOrder[] {
    return orderList.filter(item => {
      return this.tabKey === "Out"
        ? item.exportBatch !== "Unassigned"
        : item.exportBatch === "Unassigned";
    });
  }

  onDateFilterChange(_date: object, dateString: string) {
    this.filterForm.orderedDate = dateString;
  }

  handleBatchFilterChange(value: { key: string; value: string }) {
    this.filterForm.exportBatch = value.key;
  }

  handleOrderedItemFilterChange(value: { key: string; value: string }) {
    this.filterForm.orderedItem = value.key;
  }

  onSearchRecords(value: string) {
    this.filterForm.searchRecord = value;
  }

  filterData() {
    this.data = this.originalData.filter(row => {
      const result: boolean[] = [];
      Object.keys(this.filterForm).forEach(key => {
        result.push(
          this.filterForm[key] !== "" ? this.filterFields(key, row) : true
        );
      });
      return result.every(Boolean);
    });
  }

  filterFields(key: string, row: IOrder): boolean {
    if (key === "orderedDate") {
      return (
        moment(row.orderedDate).format("YYYY-MM-DD") ===
        this.filterForm.orderedDate
      );
    }
    if (key === "searchRecord") {
      const columsDataIndex = this.columns
        .filter(column => column.dataIndex)
        .map(column => column.dataIndex);
      const searchedArray = columsDataIndex.map(col =>
        row[col as keyof IOrder].includes(this.filterForm.searchRecord)
      );
      return searchedArray.some(Boolean);
    }
    return row[key as keyof IOrder] === this.filterForm[key];
  }

  customRow(record: IOrder) {
    return {
      on: {
        click: () => {
          this.$router.push(`/order-overview/${record.orderId}`);
        }
      }
    };
  }
}
</script>
