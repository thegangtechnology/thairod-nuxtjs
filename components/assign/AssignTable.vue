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
        <a-col :span="12">
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

import { IOrder } from "~/types/order.type";

interface IMain {
  [key: string]: string;
}

interface IFilter extends IMain {
  orderedDate: string;
  orderedItem: string;
  searchRecord: string;
}

@Component
export default class AssignOverview extends Vue {
  @Prop({ required: true }) originalData!: IOrder[];

  tabKey: string = "All";

  data: IOrder[] = this.originalData ? this.originalData : [];

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
      key: "operation",
      scopedSlots: { customRender: "operation" }
    }
  ];

  filterForm: IFilter = {
    orderedDate: "",
    orderedItem: "",
    searchRecord: ""
  };

  @Watch("filterForm", { immediate: true, deep: true })
  onFilterChange() {
    this.filterData();
  }

  @Watch("originalData", { immediate: true, deep: true })
  onOriginalChange() {
    this.data = this.originalData;
  }

  get recordsLength(): number {
    return this.data.length;
  }

  onTabChange(key: string) {
    this.tabKey = key;
  }

  onDateFilterChange(_date: object, dateString: string) {
    this.filterForm.orderedDate = dateString;
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
        String(row[col as keyof IOrder]).includes(this.filterForm.searchRecord)
      );
      return searchedArray.some(Boolean);
    }
    return row[key as keyof IOrder] === this.filterForm[key];
  }

  customRow(record: IOrder) {
    return {
      on: {
        click: () => {
          this.$router.push(`/${record.orderId}`);
        }
      }
    };
  }
}
</script>
