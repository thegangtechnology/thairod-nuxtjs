<template>
  <div class="overview-tab__container">
    <a-tabs
      :default-active-key="tabKey"
      :animated="false"
      @change="onTabChange"
    >
      <a-tab-pane key="all">
        <span slot="tab"> ทั้งหมด ({{ allData.length }})</span>
        <OverviewTable
          :originalData="allData"
          :search="search"
          :tab-key="tabKey"
          :option="updateOption"
        />
      </a-tab-pane>
      <a-tab-pane key="wait">
        <span slot="tab">
          ที่ต้องจัดส่ง ({{ getTabContentAmount("wait") }})
        </span>
        <OverviewTable
          :originalData="getTabContent('wait')"
          :search="search"
          :tab-key="tabKey"
          :option="updateOption"
        />
      </a-tab-pane>
      <a-tab-pane key="print">
        <span slot="tab">
          พิมพ์ใบจัดส่งแล้ว ({{ getTabContentAmount("print") }})
        </span>
        <OverviewTable
          :originalData="getTabContent('print')"
          :search="search"
          :tab-key="tabKey"
          :option="updateOption"
        />
      </a-tab-pane>
      <a-tab-pane key="out">
        <span slot="tab">
          ดำเนินการส่งแล้ว ({{ getTabContentAmount("out") }})
        </span>
        <OverviewTable
          :originalData="getTabContent('out')"
          :search="search"
          :tab-key="tabKey"
          :option="updateOption"
        />
      </a-tab-pane>
      <a-tab-pane key="received">
        <span slot="tab">
          ส่งมอบสำเร็จ ({{ getTabContentAmount("received") }})
        </span>
        <OverviewTable
          :originalData="getTabContent('received')"
          :search="search"
          :tab-key="tabKey"
          :option="updateOption"
        />
      </a-tab-pane>
      <div
        v-if="tabKey !== 'all'"
        slot="tabBarExtraContent"
        class="overview-tab__buttons"
      >
        <a-select v-model="updateOption" class="overview-button__cta">
          <!-- @change="handleChange" -->
          <a-select-option value="default">
            อัปเดตข้อมูลรายการจัดส่ง
          </a-select-option>
          <a-select-option v-if="canUpdatePrint" value="updatePrint">
            อัปเดตการพิมพ์ใบจัดส่ง
          </a-select-option>
          <a-select-option
            v-if="canUpdateOutForDelivery"
            value="updateDelivery"
          >
            อัปเดตการจัดส่ง
          </a-select-option>
          <a-select-option v-if="canUpdateReceived" value="updateReceived">
            อัปเดตการส่งมอบ
          </a-select-option>
        </a-select>
      </div>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { OrderModule } from "~/store";
import { IOrder } from "~/types/order.type";

@Component
export default class OrderOverview extends Vue {
  @Prop({ required: true }) search!: string;

  tabKey: string = "wait";
  updateOption: string = "default";

  originalData: IOrder[] = [];

  onTabChange(key: string) {
    this.tabKey = key;
    this.updateOption = "default";
  }

  get allData() {
    return OrderModule.getOrderList;
  }

  get canUpdatePrint() {
    return this.tabKey !== "received" && this.tabKey !== "out";
  }

  get canUpdateOutForDelivery() {
    return this.tabKey !== "wait" && this.tabKey !== "received";
  }

  get canUpdateReceived() {
    return this.tabKey !== "wait" && this.tabKey !== "print";
  }

  getTabContent(tabKey: string): IOrder[] {
    return this.allData.filter(item => {
      return item.status === tabKey;
    });
  }

  getTabContentAmount(tabKey: string): number {
    return this.getTabContent(tabKey).length;
  }
}
</script>
