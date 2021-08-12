<template>
  <a-card id="stock-overview-card">
    <a-tag disabled :class="getTagClass(stockOverview.pvName)">
      {{ stockOverview.pvName }}
    </a-tag>
    <a-list-item>
      <a-list-item-meta :description="stockOverview.stock.currentTotal.toLocaleString() + ' ' + stockOverview.unit">
        <span slot="title">จำนวนในคลัง</span>
      </a-list-item-meta>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta :description="stockOverview.stock.procured.toLocaleString() + ' ' + stockOverview.unit">
        <span slot="title">ยอดรวมสะสม</span>
      </a-list-item-meta>
    </a-list-item>
  </a-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ProductSummary } from '~/types/dashboard/dashboard.type'
import { defaultProductSummary } from '~/types/dashboard/dashboard.default'

export default Vue.extend({
  props: {
    stockOverview: {
      type: Object as PropType<ProductSummary>,
      default: () => (defaultProductSummary)
    }
  },
  data () {
    return {
    }
  },
  methods: {
    getTagClass (itemName: string) : string {
      switch (itemName) {
        case 'กล่องเขียว':
          return 'green-box'
        case 'กล่องเหลือง':
          return 'yellow-box'
        default:
          return 'other-items'
      }
    }
  }
})
</script>

<style scoped>

.ant-tag, .ant-tag a, .ant-tag a:hover .ant-tag:hover{
  font-weight: bold;
  font-size: 18px;
  padding: 4px 14px;
  border-color: transparent;
  opacity: 1;
}

.green-box {
  background-color: #75D7844D;
  color: #4ABE5C;
}

.yellow-box {
  background-color: #FBDC9F4D;
  color: #F3BF56;
}

.other-items {
  background-color: #CACBCC4D;
  color: #818181;
}

.ant-list-item-meta-description {
  font-weight: bold;
  color: #001740;
}

.ant-list-item-meta-title {
  color: #949A9F;
  font-size: 17px;
}

.ant-list-item {
  padding: 8px 0 0 0;
}

</style>

<style>
#stock-overview-card > div.ant-card-body {
  padding: 20px;
}
#stock-overview-card {
  border-radius: 8px;
  margin: 12px;
}
</style>
