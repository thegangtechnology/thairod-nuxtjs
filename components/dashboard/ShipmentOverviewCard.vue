<template>
  <a-card id="shipment-overview-card">
    <span slot="title">
      <a-row type="flex" align="middle">
        <a-col :xl="6" :lg="6" :md="6" :sm="6" :xs="24">
          <div class="title">
            {{ formatDate(shipmentOverview.begin) }} <span class="to">ถึง</span> <br>
            {{ formatDate(shipmentOverview.end) }}
          </div>
        </a-col>
        <a-col
          :xl="14"
          :lg="13"
          :md="11"
          :sm="8"
          :xs="24"
          class="tag-col"
        >
        </a-col>
        <a-col :xl="4" :lg="5" :md="7" :sm="10" :xs="24">
          <a-button class="dashboard-btn" :disabled="shipmentOverview.totalShipmentConfirmed <= 0" @click="onPrintShipment(shipmentOverview.end)">
            <a-icon type="printer" /> พิมพ์ใบจัดส่งสินค้า
          </a-button>
        </a-col>
      </a-row>
    </span>
    <a-descriptions
      class="shipment-overview-content"
      bordered
      size="small"
      :column="{ xxl: 4, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }"
      layout="vertical"
    >
      <a-descriptions-item label="จำนวนรายการสั่งซื้อ">
        {{ shipmentOverview.totalShipmentCreated }}
      </a-descriptions-item>
      <a-descriptions-item label="รายการสั่งซื้อ">
        <tr v-for="{ pvId, pvName, stock } in shipmentOverview.productSummaries" :key="pvId">
          <td>
            {{ pvName }}
          </td>
          <td class="spacer" />
          <td>
            x {{ stock.ordered }}
          </td>
        </tr>
      </a-descriptions-item>
      <a-descriptions-item label="จำนวนรายการพร้อมส่ง">
        {{ shipmentOverview.totalShipmentConfirmed }}
      </a-descriptions-item>
      <a-descriptions-item label="รายการพร้อมส่ง">
        <tr v-for="{ pvId, pvName, stock } in shipmentOverview.productSummaries" :key="pvId">
          <td>
            {{ pvName }}
          </td>
          <td class="spacer" />
          <td>
            x {{ stock.toBeShipped }}
          </td>
        </tr>
      </a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ShipmentOverview } from '~/types/dashboard/dashboard.type'
import { defaultShipmentOverview } from '~/types/dashboard/dashboard.default'
import { printShipment } from '~/services/dashboard.service'

export default Vue.extend({
  props: {
    shipmentOverview: {
      type: Object as PropType<ShipmentOverview>,
      default: () => (defaultShipmentOverview)
    }
  },
  data () {
    return {}
  },
  methods: {
    formatDate (date: string): string {
      return new Date(date).toLocaleString('th', {
        year: '2-digit',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
    },
    onPrintShipment (date: string) : void {
      printShipment(date)
    }
  }
})
</script>

<style scoped>
.title {
  color: #001740;
  font-size: 20px;
  line-height: 1.2;
}

.ant-card {
  margin-bottom: 30px;
}

.spacer {
  width: 24px;
}

.ant-tag {
  width: 124px;
  text-align: center;
  border-radius: 3px;
  font-size: 14px;
  padding: 1px 0;
}

.tag-col {
  text-align: right;
}

.dashboard-btn {
  width: calc(100% - 6px);
}

#shipment-overview-card {
  margin: 0 0 24px 0;
}

.dashboard-btn {
  border: 2px solid #001740;
  font-size: 18px;
  font-weight: bold;
  color: #001740;
}

</style>

<style>
.shipment-overview-content > div > table > tbody > tr > th, .to {
  color: #7D7E82;
  font-size: 18px;
}

.shipment-overview-content > div > table > tbody > tr > td {
  color: #001740;
  font-size: 18px;
}

#shipment-overview-card > .ant-card-body {
  padding: 0;
}

.shipment-overview-content > .ant-descriptions-view {
  border: 0;
  border-radius: 0;
  border-top: 1px solid #e8e8e8;
}

#shipment-overview-card {
  border-radius: 8px;
  margin: 12px;
}

</style>
