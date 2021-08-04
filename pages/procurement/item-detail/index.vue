<template>
  <div>
    <procurement-header :title="itemDetail.name" :on-back-button-click="onBackButtonClick" />
    <a-row type="flex" justify="center">
      <a-col :xs="24" :sm="24" :md="20" :lg="12">
        <item-detail-component :inventory-record="inventoryRecord" :item-detail="itemDetail" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProcurementHeader from '~/components/procurement/headers/ProcurementHeader.vue'
import ItemDetailComponent from '~/components/procurement/ItemDetail.vue'
import ProcurementModule from '~/store/procurement.module'
import { InventoryRecord, ItemDetail } from '~/types/procurement.type'

export default Vue.extend({
  components: { ProcurementHeader, ItemDetailComponent },
  layout: 'empty',
  middleware: 'auth',
  data () {
    return {
    }
  },
  computed: {
    inventoryRecord () : InventoryRecord {
      return ProcurementModule.itemDetailPageInfo.inventoryRecord
    },
    itemDetail () : ItemDetail {
      return ProcurementModule.itemDetailPageInfo.itemDetail
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
