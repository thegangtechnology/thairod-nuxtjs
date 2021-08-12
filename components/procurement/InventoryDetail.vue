<template>
  <div class="container">
    <a-row type="flex" justify="center">
      <a-col :xs="24" :sm="24" :md="20" :lg="12">
        <a-row>
          <a-col :span="12">
            <div class="card left-card" :style="lessVars">
              <div> {{ leftCard.title }}</div>
              <strong>{{ leftCard.amount > 0 ? leftCard.amount.toLocaleString() : '-' }} {{ leftCard.unit }}</strong>
            </div>
          </a-col>
          <a-col :span="12">
            <div class="card right-card" :style="lessVars">
              <div>{{ rightCard.title }}</div>
              <strong>{{ rightCard.amount > 0 ? rightCard.amount.toLocaleString() : '-' }} {{ rightCard.unit }}</strong>
            </div>
          </a-col>
        </a-row>
        <div class="warehouse-list">
          <strong class="list-title"> {{ inventoryByWarehouseTitle }} </strong>
          <a-list :data-source="warehouseStocks" size="small">
            <a-list-item slot="renderItem" slot-scope="{warehouse, amount, unit}">
              <div>
                <span slot="title">
                  {{ warehouse }}
                </span>
              </div>
              <strong>
                {{ amount.toLocaleString() }} {{ unit }}
              </strong>
            </a-list-item>
          </a-list>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { WarehouseStock, InventoryDetailCard } from '~/types/procurement/procurement.type'
import { defaultInventoryDetailCard } from '~/types/procurement/procurement.default'

export default Vue.extend({
  props: {
    warehouseStocks: {
      type: Array as PropType<WarehouseStock[]>,
      default: () => ([] as WarehouseStock[])
    },
    inventoryByWarehouseTitle: {
      type: String,
      default: ''
    },
    leftCard: {
      type: Object as PropType<InventoryDetailCard>,
      default: () => (defaultInventoryDetailCard)
    },
    rightCard: {
      type: Object as PropType<InventoryDetailCard>,
      default: () => (defaultInventoryDetailCard)
    }

  },
  data () {
    return {}
  },
  computed: {
    lessVars () : Object {
      return {
        '--left-card-color': this.leftCard.backgroundColor,
        '--right-card-color': this.rightCard.backgroundColor
      }
    }
  }
})
</script>

<style scoped lang="less">

.ant-list-split .ant-list-item {
  border-bottom: 0;
  padding: 0;
}

.list-title {
  line-height: 36px;
  color: black;
}

.container {
  padding: 28px 24px;
}

.card {
  border-radius: 8px;
  color: #ffffff;
  padding: 14px 20px;
  line-height: 24px;
}

.card div {
  font-size: 18px;
}

.left-card {
  margin-right: 8px;
  background-color: var(--left-card-color);
}

.right-card {
  margin-left: 8px;
  background-color: var(--right-card-color);
}

.warehouse-list {
  padding-top: 14px;
}

</style>
