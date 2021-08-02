<template>
  <div>
    <procurement-header :title="headerTitle" :on-back-button-click="onBackButtonClick" />
    <a-row type="flex" justify="center">
      <a-col :xs="24" :sm="24" :md="20" :lg="12">
        <item-detail :inventory-record="inventoryRecord" :item-description="itemDescription" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProcurementHeader from '~/components/procurement/headers/ProcurementHeader.vue'
import ItemDetail from '~/components/procurement/ItemDetail.vue'
import { getInventoryRecord, getItemDescription } from '~/services/procurement'

export default Vue.extend({
  components: { ProcurementHeader, ItemDetail },
  layout: 'empty',
  props: {
    headerTitle: { type: String, default: 'กล่องสีเขียว' }
  },
  data () {
    return {
      inventoryRecord: { currentAmount: 0, accumulativeAmount: 0, usedAmount: 0, accumulativeUsed: 0, unit: '' },
      itemDescription: '-'
    }
  },
  async mounted () {
    this.itemDescription = await getItemDescription()
    this.inventoryRecord = await getInventoryRecord()
  },
  methods: {
    onBackButtonClick () : void {
      this.$router.push('/procurement')
    }
  }
})
</script>

<style scoped>
</style>
