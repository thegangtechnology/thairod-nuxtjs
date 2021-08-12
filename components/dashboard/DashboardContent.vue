<template>
  <div class="container">
    <a-card class="topic-card">
      <span slot="title">
        <a-row>
          <a-col :xl="8" :lg="8" :md="8" :sm="8" :xs="24">
            <strong>ภาพรวมคลังสินค้า</strong>
          </a-col>
          <a-col :xl="13" :lg="12" :md="11" :sm="8" :xs="0" />
          <a-col :xl="3" :lg="4" :md="5" :sm="8" :xs="24">
            <a-button class="dashboard-btn to-procurement-btn" @click="$router.push('/procurement')"> จัดการคลังสินค้า </a-button>
          </a-col>
        </a-row>
      </span>
      <a-row type="flex">
        <a-col
          v-for="stockOverview in stockOverviews"
          :key="stockOverview.pvId"
          :xl="4"
          :lg="6"
          :md="8"
          :sm="8"
          :xs="24"
        >
          <stock-overview-card :stock-overview="stockOverview" />
        </a-col>
      </a-row>
    </a-card>

    <a-card class="topic-card">
      <span slot="title">
        <strong>ภาพรวมการจัดส่ง</strong>
      </span>
      <shipment-overview-card v-for="shipmentOverview in shipmentOverviews" :key="shipmentOverview.begin" :shipment-overview="shipmentOverview" />
    </a-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import StockOverviewCard from '~/components/dashboard/StockOverviewCard.vue'
import ShipmentOverviewCard from '~/components/dashboard/ShipmentOverviewCard.vue'
import DashboardModule from '~/store/dashboard.module'
import { ProductSummary, ShipmentOverview } from '~/types/dashboard/dashboard.type'

export default Vue.extend({
  components: { StockOverviewCard, ShipmentOverviewCard },
  data () {
    return {
    }
  },
  computed: {
    stockOverviews () : ProductSummary[] {
      return DashboardModule.stockOverviews
    },
    shipmentOverviews () : ShipmentOverview[] {
      return DashboardModule.shipmentOverviews
    }
  },
  mounted () {
    DashboardModule.getDashboardInfo()
  }
})
</script>

<style>
</style>

<style scoped>

.topic-card {
  min-width: 300px;
  border-radius: 8px;
  margin: 12px;
}

.dashboard-btn, .dashboard-btn:hover, .dashboard-btn:active, .dashboard-btn:focus {
  border: 2px solid #001740;
  font-size: 18px;
  font-weight: bold;
  color: #001740;
}

</style>
