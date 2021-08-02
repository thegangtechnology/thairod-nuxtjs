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
import ProcurementModule from '~/store/procurement.module'
import { InventoryRecord } from '~/types/procurement.type'

export default Vue.extend({
  components: { ProcurementHeader, ItemDetail },
  layout: 'empty',
  data () {
    return {
    }
  },
  computed: {
    headerTitle () : string {
      return ProcurementModule.itemDetailPageInfo.itemDetail.name
    },
    inventoryRecord () : InventoryRecord {
      return ProcurementModule.itemDetailPageInfo.inventoryRecord
    },
    itemDescription () : string {
      return ProcurementModule.itemDetailPageInfo.itemDetail.description
    }
  },
  async mounted () {
    await ProcurementModule.getItemDetailPageInfo(this.$route.query.id)
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
