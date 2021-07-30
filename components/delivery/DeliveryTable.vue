<template>
  <div class="delivery-body">
    <div class="delivery-body__container">
      <div class="delivery-body__header">
        กรุณาเลือกรายการสั่งซื้อที่ดำเนินการส่งมอบให้ผู้รับการรักษาเรียบร้อยแล้ว
      </div>
      <div class="delivery-filter__container">
        <div class="delivery-filter__header">
          ตัวกรองข้อมูล
        </div>
        <a-form layout="vertical">
          <div class="delivery-filter__form">
            <div class="date">
              <a-form-item label="วันและเวลาที่สั่ง">
                <a-input placeholder="input search text" />
              </a-form-item>
            </div>
            <div class="batch">
              <a-form-item label="ล็อตการจัดส่ง">
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
      <div class="delivery-table__container">
        <a-table
          row-key="orderId"
          :row-selection="rowSelection"
          :columns="columns"
          :data-source="data"
        >
          <div
            slot="deliveryStatus"
            slot-scope="text, record"
            class="table-form__input"
          >
            <div v-if="record.deliveryStatus"></div>
            <div v-else>N/A</div>
          </div>
          <div
            slot="deliveryStatus"
            slot-scope="text, record"
            class="table-form__input"
          >
            <div v-if="record.deliveryStatus"></div>
            <div v-else>N/A</div>
          </div>
        </a-table>
      </div>
    </div>
    <div class="delivery-button__container">
      <a-button class="delivery-button__cta cancel" @click="goBack">
        <span>
          ยกเลิก
        </span>
      </a-button>
      <a-button
        class="delivery-button__cta submit"
        @click="visibleSubmitDialog = true"
      >
        <span> อัปเดตข้อมูล ({{ selectedRows.length }}) </span>
      </a-button>
    </div>
    <a-modal
      class="delivery-modal__container"
      v-model="visibleSubmitDialog"
      centered
      :closable="false"
      :width="480"
    >
      <div class="delivery-modal__img">
        <img :src="BoxImg" alt="BoxImg" />
      </div>
      <div class="delivery-modal__title">ยืนยันการอัปเดตข้อมูล</div>
      <div class="delivery-modal__subtitle">
        รายการสั่งซื้อจำนวน 3 รายการกำลังจะถูกอัปเดตข้อมูลการพิมพ์ใบจัดส่งจาก
        N/A เป็น <span>ดำเนินการพิมพ์แล้ว </span>
      </div>
      <template slot="footer">
        <div class="delivery-modal__footer">
          <a-button
            class="delivery-button__cta cancel"
            key="back"
            @click="visibleSubmitDialog = false"
          >
            Cancel
          </a-button>
          <a-button
            class="delivery-button__cta submit"
            key="submit"
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
import moment from "moment";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import BoxSvg from "~/assets/images/delivery/box.svg";
import { OrderModule } from "~/store";
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
export default class PrintTable extends Vue {
  @Prop({ required: true }) search!: string;

  private BoxImg = BoxSvg;

  columns = [
    {
      title: "เลขที่รายการสั่งซื้อ",
      dataIndex: "orderId"
    },
    {
      title: "รายการสินค้า",
      dataIndex: "orderedItem"
    },
    {
      title: "จำนวน"
      // dataIndex: "orderedItem"
    },
    {
      title: "CID",
      dataIndex: "cid"
    },
    {
      title: "ผู้รับการรักษา",
      dataIndex: "patientName"
    },
    {
      title: "ล็อตการจัดส่ง",
      dataIndex: "exportBatch"
    },
    {
      title: "สถานะการจัดส่ง",
      scopedSlots: { customRender: "deliveryStatus" }
    },
    {
      title: "สถานะการพิมพ์ใบจัดส่ง",
      scopedSlots: { customRender: "printStatus" }
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

  selectedRows: string[] = [];

  visibleSubmitDialog: boolean = false;

  @Watch("search", { immediate: true, deep: true })
  onSearchChange() {
    this.filterForm.searchRecord = this.search;
  }

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

  get rowSelection() {
    return {
      onChange: (selectedRowKeys: any, _selectedRows: any) => {
        this.selectedRows = selectedRowKeys;
      },
      getCheckboxProps: (record: any) => ({
        props: {
          disabled: record.name === "Disabled User", // Column configuration not to be checked
          name: record.name
        }
      })
    };
  }

  mounted() {
    this.importData();
  }

  importData() {
    this.originalData = OrderModule.getOrderList;
    this.data = this.originalData;
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

  goBack() {
    this.$router.go(-1);
  }

  onSave() {
    this.visibleSubmitDialog = true;
    OrderModule.updateDeliveryStatus(this.selectedRows);
    this.$router.push(`/order-overview`);
  }
}
</script>
