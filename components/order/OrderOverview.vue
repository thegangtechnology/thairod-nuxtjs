<template>
  <div class="overview-container">
    <div>
      <a-tabs default-active-key="All" :animated="false" @change="onTabChange">
        <a-tab-pane key="All" tab="ทั้งหมด (400)">
          <OverviewTable :tab-key="tabKey" />
        </a-tab-pane>
        <a-tab-pane key="Wait" tab="ที่ต้องจัดส่ง (150)">
          <OverviewTable :tab-key="tabKey" />
        </a-tab-pane>
        <a-tab-pane key="Out" tab="ดำเนินการแล้ว (250)">
          <OverviewTable :tab-key="tabKey" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class OrderOverview extends Vue {
  tabKey: string = "All";

  onTabChange(key: string) {
    this.tabKey = key;
  }
}
</script>
