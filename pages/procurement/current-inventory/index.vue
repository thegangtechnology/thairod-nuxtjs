<template>
  <div>
    <procurement-header :title="'ยอดรวมในคลังสินค้า'" :on-back-button-click="onBackButtonClick"/>
    <inventory-detail
      :warehouse-stocks="warehouseStocks"
      :left-card="leftCard"
      :right-card="rightCard"
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
      leftCard: {
        backgroundColor: '#001740',
        title: 'จำนวนในคลัง',
        amount: '-',
        unit: 'กล่อง'
      },
      rightCard: {
        backgroundColor: '#133571',
        title: 'ยอดรวมสะสม',
        amount: '-',
        unit: 'กล่อง'
      }
    }
  },
  methods: {
    onBackButtonClick () : void {
      this.$router.push('/procurement/item-detail')
    }
  }
})
</script>

<style scoped>

</style>
