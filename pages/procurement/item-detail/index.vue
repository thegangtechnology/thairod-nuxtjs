<template>
  <div>
    <procurement-header :title="itemDetail.name" :on-back-button-click="onBackButtonClick" />
    <a-row type="flex" justify="center">
      <a-col :xs="24" :sm="24" :md="20" :lg="12">
        <item-detail-component :item-detail="itemDetail" :item-stock="itemStock" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProcurementHeader from '~/components/procurement/headers/ProcurementHeader.vue'
import ItemDetailComponent from '~/components/procurement/ItemDetail.vue'
import ProcurementModule from '~/store/procurement.module'
import { ItemDetail, Stock } from '~/types/procurement.type'

export default Vue.extend({
  components: { ProcurementHeader, ItemDetailComponent },
  layout: 'empty',
  data () {
    return {
    }
  },
  computed: {
    itemDetail () : ItemDetail {
      return ProcurementModule.currentItemDetail
    },
    itemStock () : Stock {
      return ProcurementModule.currentItemStock
    }
  },
  async mounted () {
    await ProcurementModule.getItemDetailPageInfo(this.$route.query.id.toString())
  },
  methods: {
    onBackButtonClick () : void {
      this.$router.push('/procurement')
    }
  }
})
</script>
