<template>
  <div>
    <procurement-header :title="'ยอดรวมในคลังสินค้า'" :on-back-button-click="onBackButtonClick" />
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
  middleware: 'auth',
  data () {
    return {
      warehouseStocks: [
        // { warehouse: 'Warehouse A', amount: 30, unit: 'กล่อง' },
        // { warehouse: 'Warehouse B', amount: 20, unit: 'กล่อง' },
        // { warehouse: 'Warehouse C', amount: 25, unit: 'กล่อง' },
        // { warehouse: 'Warehouse D', amount: 25, unit: 'กล่อง' }
      ],
      inventoryByWarehouseTitle: 'ยอดรวมจากแต่ละคลังสินค้า',
      leftCard: {
        backgroundColor: '#001740',
        title: 'จำนวนในคลัง',
        amount: 0,
        unit: 'กล่อง'
      },
      rightCard: {
        backgroundColor: '#133571',
        title: 'ยอดรวมสะสม',
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
