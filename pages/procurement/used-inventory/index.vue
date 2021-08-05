<template>
  <div>
    <procurement-header :title="'ยอดใช้ในคลังสินค้า'" :on-back-button-click="onBackButtonClick"/>
    <inventory-detail
      :warehouse-stocks="warehouseStocks"
      :left-card="leftCard"
      :right-card="rightCard"
      :inventory-by-warehouse-title="inventoryByWarehouseTitle"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProcurementHeader from '~/components/procurement/headers/ProcurementHeader.vue'
import InventoryDetail from '~/components/procurement/InventoryDetail.vue'
export default Vue.extend({
  components: { InventoryDetail, ProcurementHeader },
  layout: 'empty',
  data () {
    return {
      warehouseStocks: [
        // { warehouse: 'Warehouse A', amount: 30, unit: 'กล่อง' },
        // { warehouse: 'Warehouse B', amount: 20, unit: 'กล่อง' },
        // { warehouse: 'Warehouse C', amount: 25, unit: 'กล่อง' },
        // { warehouse: 'Warehouse D', amount: 25, unit: 'กล่อง' }
      ],
      inventoryByWarehouseTitle: 'ยอดใช้วันนี้จากแต่ละคลังสินค้า',
      leftCard: {
        backgroundColor: '#92959A',
        title: 'จำนวนที่ใช้วันนี้',
        amount: 0,
        unit: 'กล่อง'
      },
      rightCard: {
        backgroundColor: '#B7B8B9',
        title: 'ยอดใช้สะสม',
        amount: 0,
        unit: 'กล่อง'
      }
    }
  },
  methods: {
    onBackButtonClick () : void {
      this.$router.push({ path: '/procurement/item-detail', query: { id: this.$route.query.id } })
    }
  }
})
</script>
