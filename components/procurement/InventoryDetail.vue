<template>
  <div class="container">
    <a-row>
      <a-col :span="12">
        <div class="card left-card" :style="lessVars">
          <div> {{ leftCard.title }}</div>
          <b>{{ leftCard.amount.toLocaleString() }} {{ leftCard.unit }}</b>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="card right-card" :style="lessVars">
          <div>{{ rightCard.title }}</div>
          <b>{{ rightCard.amount.toLocaleString() }} {{ rightCard.unit }}</b>
        </div>
      </a-col>
    </a-row>
    <div class="warehouse-list">
      <b class="list-title"> ชื่อคลังสินค้า </b>
      <a-list :data-source="warehouseStocks" size="small">
        <a-list-item slot="renderItem" slot-scope="{warehouse, amount, unit}">
          <div>
            <span slot="title">
              {{ warehouse }}
            </span>
          </div>
          <b>
            {{ amount.toLocaleString() }} {{ unit }}
          </b>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { WarehouseStock, InventoryDetailCard } from '~/types/procurement.type'

export default Vue.extend({
  props: {
    warehouseStocks: {
      type: Object as PropType<WarehouseStock>,
      default: () => ({})
    },
    leftCard: {
      type: Object as PropType<InventoryDetailCard>,
      default: () => ({
        backgroundColor: '#ffffff',
        title: '',
        amount: 0,
        unit: ''
      })
    },
    rightCard: {
      type: Object as PropType<InventoryDetailCard>,
      default: () => ({
        backgroundColor: '#ffffff',
        title: '',
        amount: 0,
        unit: ''
      })
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

//.ant-list-split .ant-list-item {
//  border-bottom: 0;
//  padding: 0;
//}

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
